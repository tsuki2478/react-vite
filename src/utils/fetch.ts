import { isObj } from '@/utils/util';

type IndexedObject = {
    [key: string]: any;
};

type ReCodeType = {
    code?: number | string;
    data: any;
    msg: string;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Uri = string;

async function request(input: RequestInfo, init?: RequestInit) {
    return fetch(input, { ...init, credentials: 'same-origin' });
}

function getCookie() {
    const res = {} as IndexedObject;
    for (const kv of document.cookie.split('; ')) {
        const [k, v] = kv.split('=');
        res[k] = v;
    }
    return res;
}

function addCsrfToken(init: RequestInit) {
    const headers = { ...init.headers } as IndexedObject;
    try {
        headers['x-csrf-token'] = getCookie().csrfToken;
    } catch (e) {
        //
    }
    init.headers = headers;
}

function getQueryString(data: Object = {}) {
    return Object.entries(data)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
}

/**
 * status 错误
 */
const statusCode = (code: number) => {
    switch (Number(code)) {
        case 403:
            break;

        default:
            break;
    }
};

async function handleResponse(res: Response) {
    if (!res.ok) {
        statusCode(res.status);
        return res;
    }
    if (res.type === 'cors') return res;
    return res.json();
}

async function curl(method: Method, uri: Uri, data: {}, headers?: {}) {
    const url = `${uri}`;
    const args = [url, {}] as [string, RequestInit];
    args[0] = encodeURI(args[0]);
    args[1].method = method;
    args[1].headers = {
        ...headers,
    };
    switch (method) {
        case 'GET':
            // 处理参数
            // eslint-disable-next-line no-case-declarations
            const qs = getQueryString(data);
            if (qs) args[0] += `?${qs}`;
            // 发起请求
            // eslint-disable-next-line new-cap
            return request(...args)
                .then(handleResponse)
                .catch(() => {
                    //
                });
        case 'DELETE': {
            // 处理参数
            const dlqs = getQueryString(data);
            if (dlqs) args[0] += `?${dlqs}`;

            // 发起请求
            return request(...args).then(handleResponse);
        }

        case 'POST':
            return request(...args).then(handleResponse);

        case 'PUT': {
            // 处理参数
            args[1].headers = {
                ...args[1].headers,
                'Content-Type': 'application/json',
            };
            args[1].body = JSON.stringify(data);
            addCsrfToken(args[1]);

            return request(...args).then(handleResponse);
        }

        default:
            return request(...args).then(handleResponse);
    }
}

const urlLink = (url: string, value: any, method: string) => {
    let newUrl = url;
    if (method !== 'POST') {
        if (value?.urlId) {
            newUrl = `${newUrl}/${value.idData.id}`;
        }
        if (value?.get && isObj(value?.data)) {
            newUrl = `${`${newUrl}?${getQueryString(value.data)}`}`;
        }
    }
    return newUrl;
};

/**
 * @param reData 请求成功200，需要判断其code，包含返回全部数据的对象
 *  */
const errResponse = (reData: ReCodeType) => {
    switch (Number(reData.code)) {
        case 200:
            break;

        case 403:
            window.location.href = `${window.location.protocol}//${window.location.host}/login`;
            break;

        default:
            break;
    }
};

async function curlApi(method: Method, uri: Uri, value: any, header?: object) {
    const url = urlLink(uri, value, method);
    const data = method === 'POST' ? value : (isObj(value) && value.body) || {};
    const headers = {
        ...header,
    };

    const res = await curl(method, url, data, headers);

    if (res && res.code === 0) return res;

    errResponse(res);

    return res;
}

export default curlApi;
