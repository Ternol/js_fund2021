import React from 'react';
import MyButton from "./UI/button/myButton";
import {useHistory} from "react-router-dom";

const PostItem = (props) => {
    const router = useHistory()

    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <p>{props.post.body}</p>
                </div>
                <div className="post__btn">
                    <MyButton onClick={() => router.push(`/posts/${props.post.id}`) }>Открыть</MyButton>
                    <MyButton onClick={() => props.delete(props.post)}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;