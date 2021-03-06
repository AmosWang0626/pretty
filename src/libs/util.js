import axios from 'axios';

export const BASE_URL = '/property';

axios.defaults.headers.post['Content-Type'] = 'application/json';

let util = {};
util.title = function (title) {
    title = title ? title : 'Property';
    window.document.title = title;
};

util.httpRequestGet = function (url, data) {
    let token = localStorage.getItem('token');
    let rolesId = localStorage.getItem('rolesId');
    return axios.get(url, {
        baseURL: BASE_URL,
        headers: {token, rolesId},
        params: data
    }).then(getResult).catch(
        function (error) {
            console.log(error);
            return {
                flags: 'fail',
                message: '服务器异常 ' + error
            };
        });
};

util.httpRequestPost = function (url, data) {
    let token = localStorage.getItem('token');
    let rolesId = localStorage.getItem('rolesId');
    return axios.post(url, data, {
        baseURL: BASE_URL,
        headers: {token, rolesId},
    }).then(getResult).catch(
        function (error) {
            return {
                flags: 'fail',
                message: '服务器异常 ' + error
            };
        });
};

let getResult = res => {
    if (res.data && res.data.respCode === '1000') {
        // console.log(JSON.stringify(res.data.body));
        return {
            flags: 'success',
            data: res.data.body,
            message: res.data.respMsg
        };
    } else {
        console.error(res.data.respMsg);
        return {
            flags: 'fail',
            code: res.data.respCode,
            message: res.data.respMsg
        };
    }
};

export default util;