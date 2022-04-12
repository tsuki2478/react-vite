import { environment } from './environment';

// 开发端口
export const PORT = 8080;
// 基本路径
export const BASE_PATH = './';
// 请求接口地址
export const PROXY_HTTP = environment.target;
// 应用名称
export const APP_TITLE = '管理系统';
// 开启 mock
export const APP_MOCK: boolean = false;
// 开启兼容
export const APP_LEGACY: boolean = false;
// 开启包依赖分析 可视化
export const APP_ANALYZE: boolean = false;
// 去除 console
export const DROP_CONSOLE: boolean = true;
// 开启Gzip压缩
export const APP_COMPRESS_GZIP: boolean = false;
// 开启Gzip压缩，删除原文件
export const APP_COMPRESS_GZIP_DELETE_FILE: boolean = false;
