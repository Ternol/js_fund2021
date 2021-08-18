import React, {useEffect, useState} from "react";
import './App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/myButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import {useFetching} from "./hooks/useFetching";
import {getPageCount} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {

    const [posts, setPosts] = useState([])

    // sort - значение, которое получаем из инпута  |  query - значение в поисковой строке
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);



    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, currentPage);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const changePage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => fetchPosts(), [currentPage])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const searchedAndSortedPosts = usePosts(posts, filter.sort, filter.query)


    return (
        <div className='App'>
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

            {isPostsLoading
                ? <h1 style={{textAlign: 'center'}}>Посты загружаются...</h1>
                : <PostsList posts={searchedAndSortedPosts} delete={deletePost}/>
            }

            <Pagination totalPages={totalPages}
                        currentPage={currentPage}
                        changePage={changePage}
            />

        </div>

    )
}

export default App;
