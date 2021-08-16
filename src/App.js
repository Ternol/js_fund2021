import React, {useEffect, useMemo, useState} from "react";
import './App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/myButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState(
        [])

    // sort - значение, которое получаем из инпута  |  query - значение в поисковой строке
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [modal, setModal] = useState(false);

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })

    useEffect(() => fetchPosts(), [])
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
                :  <PostsList posts={searchedAndSortedPosts} delete={deletePost}/>
            }

        </div>

    )
}

export default App;
