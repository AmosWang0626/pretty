import axios from 'axios';
import Qs from 'qs';
import env from '../config/env';

export const BASE_URL = '/baseUrl';

let util = {};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Property';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://localhost:8085' :
    env === 'production' ?
        'https://www.url.com' :
        'https://debug.url.com';

let config = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'token': 'token-self-hello'
    }
});

util.myGet = function (url) {
    config.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

util.myPost = function (url, data) {
    config.post(url, Qs.stringify(data, {arrayFormat: 'brackets'}))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default util;