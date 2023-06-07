import React from 'react';
import {
    BrowserRouter, Routes, Route, NavLink,
    useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Posts from './fetchPosts';
import NewPost from './createPosts';
import Post from './postDetail';
import Edit from './editPosts';
import { SignIn, SignUp } from './userAuth';
import { signoutUser } from '../actions';
import RequireAuth from './requireAuth';

function Nav(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector((state) => state.auth.authenticated);
    const signOut = () => {
        dispatch(signoutUser(navigate));
    };
    return (
        <nav className="nav">
            <li className="navUL"><NavLink to="/">Express</NavLink></li>
            <div className="navRight">
                { isUserAuthenticated ? <li onClick={signOut}><NavLink to="/">Sign out</NavLink></li>
                    : (
                        <div className="navRight">
                            <li><NavLink to="/signin">Sign in</NavLink></li>
                            <li>/</li>
                            <li><NavLink to="/signup">Sign up</NavLink></li>
                        </div>
                    )}
            </div>
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
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/posts/new" element={<RequireAuth><NewPost /></RequireAuth>} />
                    <Route path="/posts/:postID" element={<Post />} />
                    <Route path="/posts/edit/:postID" element={<Edit />} />
                    <Route path="*" elemnent={<div>post not found</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
