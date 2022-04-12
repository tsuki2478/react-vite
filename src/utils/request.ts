/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { message } from 'antd';
import qs from 'qs';
import { extend } from 'umi-request';

const isDev = import.meta.env.MODE === 'development';
const basePath = '/music';

type PostType = {
    path: string;
    data?: any;
    datatype?: 'form' | 'json';
    noErrorNotice?: boolean;
    headers?: any;
    [propName: string]: any;
};

type GetType = {
    path: string;
    data?: any;
    noErrorNotice?: boolean;
    [propName: string]: any;
};

type ReCodeType = {
    code?: number | string;
    data: any;
    msg: string;
};

type HeaderTS = {
    [x: string]: any;
};

const codeMessage: Record<number, string> = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 退出登录处理
 */
let flag = true;
const logout = () => {
    if (flag) {
        flag = false;
        message.warning('登录过期，请重新登录', 1, () => {
            flag = true;
            localStorage.removeItem('Token');
            window.location.href = `${window.location.protocol}//${window.location.host}/user/login`;
        });
    }
};

/**
 * @zh-CN 网络异常处理程序
 * @en-US Exception handler
 */
const networkErrorHandler = (error: { response: Response }): any => {
    const { response } = error;
    if (response && response.status) {
        if (Number(response.status) === 401) {
            logout();
            return Promise.reject(response);
        }
        const errorText = codeMessage[response.status] || response.statusText;
        message.error(errorText);
    } else if (!response) {
        message.error('连接服务出错', 1.5);
    }
    return Promise.reject(response);
};

/**
 * 数据异常处理
 */
const codeErrorHandler = (res: any = {}) => {
    if (res.code === '401' || res.code === '403') {
        logout();
        return;
    }
    const msg = res.msg || '服务开小差';
    message.error(msg.length > 40 ? '服务开小差' : msg, 1.5);
};

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
    prefix: isDev ? '/api' : '',
    errorHandler: networkErrorHandler, // default error handling
    timeout: 20000,
    headers: {
        user_agent: 'musician_web',
        api_version: '1.0',
    },
});

/**
 * post 求情
 * @param options
 */
export const post = (options: PostType) =>
    new Promise((resolve, reject) => {
        let data = options.data || {};
        const headers: HeaderTS = {
            'Content-Type': 'application/json;charset=UTF-8',
            token: localStorage.getItem('Token'),
        };
        if (options.datatype === 'form') {
            data = qs.stringify(data);
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        const path = basePath + options.path;
        request
            .post(path, {
                ...options,
                data,
                headers: options.headers || headers,
            })
            .then((res: ReCodeType) => {
                if (Number(res.code) === 0) {
                    resolve(res);
                } else {
                    reject(res);
                    codeErrorHandler(res);
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });

/**
 * get 请求
 * @param options
 */
export const get = (options: GetType) => {
    const url = basePath + options.path;
    return new Promise((resolve, reject) => {
        const headers: HeaderTS = {
            token: localStorage.getItem('Token'),
        };
        const data = options.data || {};
        request
            .get(url, {
                params: data,
                ...options,
                headers: options.headers || headers,
            })
            .then((res: ReCodeType) => {
                if (Number(res.code) === 0) {
                    resolve(res);
                } else {
                    reject(res);
                    codeErrorHandler(res);
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

/**
 * delete 请求
 * @param options
 */
export const deletes = (options: PostType) =>
    new Promise((resolve, reject) => {
        let data: any = options.data || {};
        const headers: HeaderTS = {
            'Content-Type': 'application/json;charset=UTF-8',
            token: localStorage.getItem('Token'),
        };
        if (options.datatype === 'form') {
            data = qs.stringify(data);
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        const path = basePath + options.path;
        request
            .delete(path, {
                ...options,
                data,
                headers: options.headers || headers,
            })
            .then((res: ReCodeType) => {
                if (Number(res.code) === 0) {
                    resolve(res);
                } else {
                    reject(res);
                    codeErrorHandler(res);
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });
/**
 * put 请求
 * @param options
 */
export const put = (options: PostType) =>
    new Promise((resolve, reject) => {
        let data: any = options.data || {};
        const headers: HeaderTS = {
            'Content-Type': 'application/json;charset=UTF-8',
            token: localStorage.getItem('Token'),
        };
        if (options.datatype === 'form') {
            data = qs.stringify(data);
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        const path = basePath + options.path;
        request
            .put(path, {
                ...options,
                data,
                headers: options.headers || headers,
            })
            .then((res: ReCodeType) => {
                if (Number(res.code) === 0) {
                    resolve(res);
                } else {
                    reject(res);
                    codeErrorHandler(res);
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });

/**
 * 导出下载
 * @param options
 */
export const download = (options: PostType) =>
    new Promise((resolve, reject) => {
        let data: any = options.data || {};
        const headers: HeaderTS = {
            'Content-Type': 'application/json;charset=UTF-8',
            token: localStorage.getItem('Token'),
        };
        if (options.datatype === 'form') {
            data = qs.stringify(data);
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        const path = basePath + options.path;
        request
            .post(path, {
                ...options,
                data,
                responseType: 'blob',
                headers: options.headers || headers,
            })
            .then((res: ReCodeType) => {
                if (res.code) {
                    reject(res);
                    codeErrorHandler(res);
                } else {
                    resolve(res);
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });

export default request;
