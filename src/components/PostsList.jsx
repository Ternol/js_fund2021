import React from 'react';
import PostItem from "./PostItem";
import {useHistory} from "react-router-dom";

const PostsList = (props) => {
    return (
        <div>

            {props.posts.length
            ? <h1 style={{textAlign: 'center'}}>Список постов</h1>
            : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }

            {props.posts.map(p => <PostItem post={p} key={p.id} delete={props.delete}/>)}
        </div>
    );
};

export default PostsList;