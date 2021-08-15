import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState(
        [
            {id: 1, title: 'Javascript', body: 'Javascript - язык программирования'},
            {id: 2, title: 'Hooks', body: 'Хуки - это функции, начинающиеся со слова use (useState() и т. д)'},
            {id: 3, title: 'Component', body: 'Компонента - функция, возвращающая JSX разметку'}])
    // sort - значение, которое получаем из инпута  |  query - значение в поисковой строке
    const [filter,setFilter] = useState({sort: '', query: ''})


    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts
    }, [filter.sort, posts]);

    const searchedAndSortedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    },[sortedPosts, filter.query])



    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <PostsList posts={searchedAndSortedPosts} delete={deletePost}/>
        </div>

    )
}

export default App;
