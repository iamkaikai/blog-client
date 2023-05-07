import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll, createPost } from '../actions';

function Create(props) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const tagsRef = useRef();
    const contentRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        dispatch(fetchAll());
    }, []);

    const create = () => {
        const fields = {
            title: titleRef.current.value,
            tags: tagsRef.current.value,
            content: contentRef.current.value,
            coverUrl: imgRef.current.value,
        };
        dispatch(createPost(fields));

        // Clear the input fields
        titleRef.current.value = '';
        tagsRef.current.value = '';
        contentRef.current.value = '';
        imgRef.current.value = '';
    };

    return (
        <div className="createContainer">
            <label htmlFor="title">
                {/* Title: */}
                <input type="text" id="title" ref={titleRef} placeholder="Title" />
            </label>
            <label htmlFor="img">
                {/* ImageURL: */}
                <input type="text" id="img" ref={imgRef} placeholder="Cover image URL" />
            </label>
            <label htmlFor="content">
                {/* content: */}
                <textarea type="text" id="content" ref={contentRef} placeholder="Write some content" />
            </label>
            <label htmlFor="tags">
                {/* Tags: */}
                <input type="text" id="tags" ref={tagsRef} placeholder="Tags" />
            </label>
            <button id="create" type="button" onClick={create}> Create </button>
            <Link to="/">
                <button id="cancel" type="button"> Cancel </button>
            </Link>
        </div>

    );
}

export default Create;
