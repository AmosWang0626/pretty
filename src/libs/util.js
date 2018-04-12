import axios from 'axios';
import Qs from 'qs';

export const BASE_URL = '/baseUrl';

let util = {};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Property';
    window.document.title = title;
};

let config = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'token': localStorage.getItem('token')
    }
});

util.httpRequestGet = function (url) {
    return config.get(url)
        .then(getResult)
        .catch(function (error) {
            console.log(error);
        });
};

util.httpRequestQsPost = function (url, data) {
    return config.post(url, Qs.stringify(data, {arrayFormat: 'brackets'}))
        .then(getResult)
        .catch(function (error) {
            console.log(error);
            console.log('-------------' + Qs.stringify(data, {arrayFormat: 'brackets'}));
        });
};

util.httpRequestJsonPost = function (url, data) {
    return config.post(url, data)
        .then(getResult)
        .catch(function (error) {
            console.log(error);
            console.log('------发送请求失败------' + JSON.stringify(data));
        });
};

let getResult = res => {
    if (res.data && res.data.respCode === '1000') {
        console.log(JSON.stringify(res.data.body));
        return {
            flags: 'success',
            data: res.data.body,
            message: res.data.respMsg
        };
    } else {
        console.error(res.data.respMsg);
        return {
            flags: 'fail',
            message: res.data.respMsg,
            code: res.data.respCode
        };
    }
};

export default util;