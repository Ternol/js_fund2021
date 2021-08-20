import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";

const PostIdPage = () => {

    const postId = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isCommLoading, commError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(postId.id);
        fetchComments(postId.id);
    }, [])



    return (
        <div>

            {isLoading
                ? <h1>Идет загрузка данных..</h1>
                : <div> <h1>Вы открыли страницу поста</h1>
                    {post.id}. {post.title}</div>
            }
            <h2>Комментарии:</h2>
            {isCommLoading
                ? <div></div>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <p>{comment.body}</p>
                        </div>
                    )
                }</div>
            }
        </div>
    );
};

export default PostIdPage;