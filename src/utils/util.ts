import * as R from 'ramda';

const isArr = (val: any) => R.type(val) === 'Array' && !R.isEmpty(val);

const isObj = (val: any) => R.is(Object, val) && !R.isEmpty(val);

const isString = (val: any) => R.type(val) === 'String' && !R.isEmpty(val);

const isEmp = (val: any) => R.isNil(val);

/* *map转化为对象（map所有键都是字符串，可以将其转换为对象） */
const strMapToObj = (strMap: any) => {
    const obj = Object.create(null);
    for (const [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
};

/** 对象转换为Map */
const objToStrMap = (obj: { [x: string]: any }) => {
    const strMap = new Map();
    if (!isObj(obj)) return strMap;
    for (const k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
};

/** 首字母大写 */
function firstCapital(name: string) {
    const lowerName = name.toLowerCase();
    return lowerName.replace(lowerName.charAt(0), lowerName.charAt(0).toUpperCase());
}

// 将对象解析成get url参数
function getQueryString(data: Object = {}) {
    const i = Object.entries(data)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');
    return i;
}

const setStorage = (key: string, initialValue: any) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
    } catch (error) {
        return error;
    }
};

const getStorage = (key: string) => {
    if (window.localStorage && window.localStorage.getItem(key)) {
        return JSON.parse(window.localStorage.getItem(key) as string);
    }
    return 'null';
};

/**
 * 缓冲函数
 * @param {Object} dom 目标dom
 * @param {Number} destination 目标位置
 * @param {Number} rate 缓动率
 * @param {Function} callback 缓动结束回调函数 两个参数分别是当前位置和是否结束
 */
export const easeout = (
    dom: HTMLElement,
    _destination: number,
    _rate: number,
    callback: { (val: number): void; (arg0: any, arg1: boolean): any }
) => {
    let position = dom.scrollTop;
    if (position === _destination || typeof _destination !== 'number') {
        return false;
    }
    const destination = _destination || 0;
    const rate = _rate || 2;
    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (fn) {
            return setTimeout(fn, 17);
        };
    }
    const step = function () {
        position += (destination - position) / rate;
        // console.log(position)
        if (Math.abs(destination - position) < 1) {
            callback && callback(destination, true);
            return;
        }
        callback && callback(position, false);
        requestAnimationFrame(step);
    };
    step();
};

/**
 * 滚动到指定元素
 * @param {Object} el 当前dom元素
 * @param {Number} offset 元素距离顶部的偏移量
 */
export const scrollIntoView = (el: any, offset = 50) => {
    if (!el) return;
    if (typeof offset !== 'number') return;
    const clientRect = el.getBoundingClientRect();
    const isElementInViewport = clientRect.top >= 0 && clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    if (!isElementInViewport) {
        console.log(isElementInViewport);
        // 注意 ！！！
        // Safari 不支持 document.documentElement.scrollTop 获取滚动条高度
        // Chrome 不支持 document.body.scrollTop 获取滚动条高度
        // 通过以下两行兼容
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const dom = scrollTop === document.documentElement.scrollTop ? document.documentElement : document.body;

        const destination = scrollTop + clientRect.top - offset > 0 ? scrollTop + clientRect.top - offset : 0;
        easeout(dom, destination, 10, function (val: number) {
            dom.scrollTo(0, val);
        });
    }
};

export { firstCapital, getQueryString, getStorage, isArr, isEmp, isObj, isString, objToStrMap, setStorage, strMapToObj };
