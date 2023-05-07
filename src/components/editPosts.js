import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll, fetchSinglePost, updatePost } from '../actions';

function Create(props) {
    const dispatch = useDispatch();
    const curPost = useSelector((store) => { return store.posts.current; });

    const [fields, setFields] = useState({
        title: '',
        tags: '',
        content: '',
        coverUrl: '',
    });

    useEffect(() => {
        dispatch(fetchAll());
    }, []);

    useEffect(() => {
        if (curPost) {
            setFields({
                title: curPost.title || '',
                tags: curPost.tags || '',
                content: curPost.content || '',
                coverUrl: curPost.coverUrl || '',
            });
        }
    }, [curPost]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const update = async (postID) => {
        try {
            await dispatch(updatePost(curPost.id, fields));
            dispatch(fetchSinglePost(postID));
        } catch (error) {
            console.log('Error while updating the post', error);
        }
    };

    if (!curPost || Object.keys(curPost).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="createContainer">
            <label htmlFor="title">
                Title:
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={fields.title}
                    onChange={handleInputChange}
                />
            </label>
            <label htmlFor="tags">
                Tags:
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={fields.tags}
                    onChange={handleInputChange}
                />
            </label>
            <label htmlFor="content">
                content:
                <textarea
                    type="text"
                    id="content"
                    name="content"
                    value={fields.content}
                    onChange={handleInputChange}
                />
            </label>
            <label htmlFor="img">
                ImageURL:
                <input
                    type="text"
                    id="img"
                    name="coverUrl"
                    value={fields.coverUrl}
                    onChange={handleInputChange}
                />
            </label>
            <Link to={`/posts/${curPost.id}`}>
                <button id="update" type="button" onClick={() => { update(curPost.id); }}> update </button>
            </Link>
            <Link to={`/posts/${curPost.id}`}>
                <button id="cancel" type="button"> Cancel </button>
            </Link>
        </div>
    );
}

export default Create;
