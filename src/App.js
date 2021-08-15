import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState(
        [
            {id: 1, title: 'Javascript', body: 'Javascript - язык программирования'},
            {id: 2, title: 'Hooks', body: 'Хуки - это функции, начинающиеся со слова use (useState() и т. д)'},
            {id: 3, title: 'Component', body: 'Компонента - функция, возвращающая JSX разметку'}])

    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    const sortedPosts = useMemo(() => {
        if (selectedSort) {
            return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts
    }, [selectedSort, posts]);

    const searchedAndSortedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    },[sortedPosts, searchQuery])


    const sortPosts = (selectValue) => {
        setSelectedSort(selectValue);
    }

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
            <MyInput placeholder='Поиск...'
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
            />
            <hr style={{margin: '15px 0'}}/>
            <MySelect defaultValue="Сортировка по:"
                      options={[
                          {value: 'title', name: 'По названию'},
                          {value: 'body', name: 'По описанию'}
                      ]}
                      value={selectedSort}
                      onChange={sortPosts}
            />

            <PostsList posts={searchedAndSortedPosts} delete={deletePost}/>
        </div>

    )
}

export default App;
