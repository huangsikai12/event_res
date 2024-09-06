// Add a request interceptor
import axios from "axios";
import {showFailToast, showNotify} from "vant";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.token = localStorage.getItem("token")
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const  res = response.data
    res?.data?.token && localStorage.setItem("token",res?.data?.token)
    return response;
}, function (error) {
    if (error.message == "Network Error")
    {
        showNotify({ type: 'danger', message: '网络错误！' });
        showFailToast('网络错误！');
        return Promise.reject(error);
    }
    const {status} = error.response
    if (status === 401)
    {
        showFailToast('登录超期！请重新登录');
        localStorage.clear()
        window.location.href = "/"

    }

    return Promise.reject(error);
});