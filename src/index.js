import $ from 'jquery';
import './style.scss';

console.log('starting up...');

let s = 0;

// $('#main').html('Here we go MF!!!');

const timer = setInterval(() => {
    $('#main').html(`You've been on this page for ${s} seconds.`);
    s += 1;
}, 1000);
