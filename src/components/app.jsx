import React from 'react';
import { createRoot } from 'react-dom';
import {
    BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import Posts from './fetchPosts';
import NewPost from './createPosts';
import Post from './postDetail';
import Edit from './editPosts';

function Nav(props) {
    return (
        <nav>
            <li className="navUL"><NavLink to="/">Express</NavLink></li>
        </nav>
    );
}

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/posts/new" element={<NewPost />} />
                    <Route path="/posts/:postID" element={<Post />} />
                    <Route path="/posts/edit/:postID" element={<Edit />} />
                    <Route path="*" elemnent={<div>post not found</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
