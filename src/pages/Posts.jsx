import React, {useEffect, useRef} from 'react'
import {useState} from "react";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/myButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostsList from "../components/PostsList";
import Pagination from "../components/UI/pagination/Pagination";


const Posts = () => {
    const lastElement = useRef();
    const observer = useRef();

    const [posts, setPosts] = useState([])

    // sort - значение, которое получаем из инпута  |  query - значение в поисковой строке
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);

    const [limit, setLimit] = useState(10);

    const [currentPage, setCurrentPage] = useState(1);

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, currentPage);
        setPosts([...posts,...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const changePage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => fetchPosts(), [currentPage])

    useEffect(()=> {
        if (isPostsLoading) return
        if (observer.current) observer.current.disconnect();
        const callback = function(entries, observer) {
            if(entries[0].isIntersecting && currentPage < totalPages) {
                setCurrentPage(currentPage+1)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    },[isPostsLoading])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const searchedAndSortedPosts = usePosts(posts, filter.sort, filter.query)


    return (
        <div>
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postsError &&
            <h1>Произошла ошибка {postsError}</h1>
            }
            <PostsList posts={searchedAndSortedPosts} delete={deletePost}/>
            <div ref={lastElement} style={{height:50}}></div>
            {isPostsLoading &&
                 <h1 style={{textAlign: 'center'}}>Посты загружаются...</h1>
            }

            <Pagination totalPages={totalPages}
                        currentPage={currentPage}
                        changePage={changePage}
            />

        </div>

    )
}

export default Posts;