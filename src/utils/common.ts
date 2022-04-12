export const getUrlParams = (d: any) => {
    for (let c = location.search.slice(1).split('&'), a = 0; a < c.length; a++) {
        const b = c[a].split('=');
        if (b[0] === d)
            if (unescape(b[1]) === 'undefined') break;
            else return unescape(b[1]);
    }
    return '';
};

export const getStringUrlParams = (url: any, d: any) => {
    const urls = url.substring(url.indexOf('?') + 1) || '';
    for (let c = urls.split('&'), a = 0; a < c.length; a++) {
        const b = c[a].split('=');
        if (b[0] === d)
            if (unescape(b[1]) === 'undefined') break;
            else return unescape(b[1]);
    }
    return '';
};

export const getValueFromEvent = (e: any) => e.target.value.replace(/(^\s*)|(\s*$)/g, '');
