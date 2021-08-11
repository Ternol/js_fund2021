import React, {useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";

function App() {
    const [posts, setPosts] = useState(
        [
            {id: 1, title: 'Javascript', body: 'Javascript - язык программирования'},
            {id: 2, title: 'Hooks', body: 'Хуки - это функции, начинающиеся со слова use (useState() и т. д)'},
            {id: 3, title: 'Component', body: 'Компонента - функция, возвращающая JSX разметку'}])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <PostsList posts={posts} delete={deletePost}/>
        </div>

    )
}

export default App;
