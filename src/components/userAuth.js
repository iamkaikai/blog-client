import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser, signupUser } from '../actions';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const keyHandle1 = (event) => {
        setEmail(event.target.value);
    };
    const keyHandle2 = (event) => {
        setPassword(event.target.value);
    };
    const signin = () => {
        dispatch(signinUser({ email, password }, navigate));
    };

    return (
        <div className="registration">
            <h1>Sign In</h1>
            <p>Awaken curiosity, sign in or sign up!</p>
            <input className="RegBox" placeholder="Enter your e-mail" value={email} onChange={keyHandle1} type="text" />
            <input className="RegBox" placeholder="Enter your password" value={password} onChange={keyHandle2} type="text" />
            <button id="create" onClick={signin} type="button"> Sign In </button>
            <Link to="/signup">
                <button id="cancel" type="button"> Sign Up </button>
            </Link>
        </div>
    );
}

export function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const keyHandle1 = (event) => {
        setEmail(event.target.value);
    };
    const keyHandle2 = (event) => {
        setPassword(event.target.value);
    };
    const signup = () => {
        dispatch(signupUser({ email, password }, navigate));
    };

    return (
        <div className="registration">
            <h1>Sign Up</h1>
            <input className="RegBox" placeholder="Enter your e-mail" value={email} onChange={keyHandle1} type="text" />
            <input className="RegBox" placeholder="Enter your password" value={password} onChange={keyHandle2} type="text" />
            <button id="create" onClick={signup} type="button"> Sign Up </button>
            <Link to="/signin">
                <button id="cancel" type="button"> Sign In </button>
            </Link>
        </div>
    );
}
