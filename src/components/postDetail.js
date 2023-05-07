import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import { fetchAll, fetchSinglePost } from '../actions';

function currentLinkInfo() {
    const location = useLocation();
    const postId = location.pathname.split('/posts/')[1];
    return postId;
}

function PostDetail(props) {
    const dispatch = useDispatch();
    const curPost = useSelector((store) => { return store.posts.current; });

    useEffect(() => {
        dispatch(fetchAll());
    }, []);

    if (!curPost || Object.keys(curPost).length === 0) {
        const curID = currentLinkInfo();
        dispatch(fetchSinglePost(curID));
        return <div>Loading...</div>;
    }

    const detail = (postID) => {
        dispatch(fetchSinglePost(postID));
    };

    return (
        <div className="postDetailContainer">
            <div className="postDetail" key={curPost.id}>
                <div className="postDetailImg">
                    {
                        curPost.coverUrl.startsWith('http')
                            ? <img src={curPost.coverUrl} alt={curPost.title} />
                            : <h1>{curPost.title}</h1>
                    }
                </div>
                <h3 className="detailTitle">{curPost.title}</h3>
                <ReactMarkdown className="detailContent">
                    {curPost.content}
                </ReactMarkdown>
                <h3 className="detailTag">tags: {curPost.tags}</h3>

                <Link to={`/posts/edit/${curPost.id}`}>
                    <button id="edit" type="button" onClick={() => { detail(curPost.id); }}> Edit </button>
                </Link>
            </div>
        </div>
    );
}

export default PostDetail;
