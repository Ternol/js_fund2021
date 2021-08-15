import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/myButton";

function App() {
    const [posts, setPosts] = useState(
        [
            {id: 1, title: 'Javascript', body: 'Javascript - язык программирования'},
            {id: 2, title: 'Hooks', body: 'Хуки - это функции, начинающиеся со слова use (useState() и т. д)'},
            {id: 3, title: 'Component', body: 'Компонента - функция, возвращающая JSX разметку'}])
    // sort - значение, которое получаем из инпута  |  query - значение в поисковой строке
    const [filter,setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);

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
        setModal(false)
    }

    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton style={{marginTop: '30px'}} onClick={()=> setModal(true)}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
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
