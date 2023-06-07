import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    fetchAll, deletePost, fetchSinglePost,
} from '../actions';
import createBTN from '../img/create.svg';
import optionBTN from '../img/option.svg';
import optionDel from '../img/del.svg';
import optionEdit from '../img/edit.svg';

function Posts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((store) => { return store.posts.all; });
    const isUserAuthenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
        dispatch(fetchAll());
    }, []);

    const del = async (postID) => {
        if (isUserAuthenticated) {
            await dispatch(deletePost(postID));
            dispatch(fetchAll());
        } else {
            navigate('/signin');
        }
    };

    const detail = (postID) => {
        dispatch(fetchSinglePost(postID));
    };

    const [visiblePostId, setVisiblePostId] = useState(null);

    const handleClick = (event, postID) => {
        setVisiblePostId(visiblePostId === postID ? null : postID);
    };
    if (!posts || posts.length === 0) {
        return (
            <div className="postContainer">
                <NavLink to="/posts/new"><img src={createBTN} alt="" className="createBTN" /></NavLink>
                <div className="empty_title">no post to display yet</div>
                <div className="empty_content">To create a new post, please click on the button at the bottom-right cornerf</div>
            </div>
        );
    } else {
        return (
            <div className="postContainer">
                <NavLink to="/posts/new"><img src={createBTN} alt="" className="createBTN" /></NavLink>
                { posts.map((post) => {
                    return (
                        <div className="post" key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <button type="button" className="postImgButton" onClick={() => detail(post.id)}>
                                    <div className="postImg">
                                        {
                                            post.coverUrl.startsWith('http')
                                                ? <img src={post.coverUrl} alt={post.title} />
                                                : <h1>{post.title}</h1>
                                        }
                                    </div>
                                </button>
                            </Link>
                            <img className="optionIcon" onClick={(event) => handleClick(event, post.id)} src={optionBTN} id={post.id} alt="" />
                            <h3 onClick={() => { detail(post.id); }}>{post.title}</h3>
                            <h3 className="tags">tags: {post.tags}</h3>
                            <Link to={`/posts/edit/${post.id}`}>
                                <img src={optionEdit}
                                    className="optionIcon"
                                    id="OptionEdit"
                                    onClick={() => { detail(post.id); }}
                                    style={{
                                        display: visiblePostId === post.id ? 'block' : 'none',
                                    }}
                                    alt=""
                                />
                            </Link>
                            <img className="optionIcon"
                                id="OptionDel"
                                src={optionDel}
                                onClick={() => { del(post.id); }}
                                style={{
                                    display: visiblePostId === post.id ? 'block' : 'none',
                                }}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Posts;
