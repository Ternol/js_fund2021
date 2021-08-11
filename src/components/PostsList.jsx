import React from 'react';
import PostItem from "./PostItem";

const PostsList = (props) => {
    return (
        <div>
            {props.posts.length
            ? <h1 style={{textAlign: 'center'}}>Список постов</h1>
            : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }

            {props.posts.map((p,index) => <PostItem post={p} number={index+1} key={p.id} delete={props.delete}/>)}
        </div>
    );
};

export default PostsList;