import axios from 'axios';
import env from '../config/env';
import qs from 'qs';

export const BASE_URL = '/property';

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

util.ajax = axios.create({
    // baseURL: ajaxUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        data = qs.toString(data);
        return data;
    }],
    withCredentials: true
});
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers['Content-Type'] = 'application/json';

util.myGet = function () {
    axios.get('/api/web/home')
        .then(function (response) {
            // console.log(this.baseURL);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default util;