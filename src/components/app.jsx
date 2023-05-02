import React from 'react';
import { createRoot } from 'react-dom';
import {
    BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import Counter from '../counter';
import Controls from './controls';

function About(props) {
    return <div> All there is to know about me</div>;
}

function Welcome(props) {
    return (
        <div>
            <p>Welcome</p>
            <Counter />
            <Controls />
        </div>
    );
}

function Nav(props) {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/test/id1">test id1</NavLink></li>
                <li><NavLink to="/test/id2">test id2</NavLink></li>
            </ul>
        </nav>
    );
}
function Test(props) {
    const { id } = useParams();
    return <div>ID:{id}</div>;
}
function FallBack(props) {
    return <div>URL Not Found</div>;
}

function App(props) {
    // return <div className="test">All the REACT are belong to us!</div>;
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/test/:id" element={<Test />} />
                    <Route path="*" elemnent={<FallBack />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
