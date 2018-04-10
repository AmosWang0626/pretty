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
    responseType: 'json',
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

util.myQsPost = function (url, data) {
    config.post(url, Qs.stringify(data, {arrayFormat: 'brackets'}))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            console.log('-------------' + Qs.stringify(data, {arrayFormat: 'brackets'}));
        });
};

util.myJsonPost = function (url, data) {
    config.post(url, data)
        .then(function (response) {
            console.log(response.data);
            // respCode: "M2010", respMsg: "结束日期不能大于开始日期", body: null}
            if (response.data.respCode === '1000') {
                // this.$Message.info(response.data.respMsg + JSON.stringify(response.data.body));
                console.log(response.data.respMsg + JSON.stringify(response.data.body));
            } else {
                // this.$Message.error(response.data.respMsg);
                console.error(response.data.respMsg);
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log('------发送请求失败-------' + JSON.stringify(data));
        });
};

export default util;