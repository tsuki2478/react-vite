import * as R from 'ramda';

import routes, { IRouteConfig } from './route';

export interface RouteComponentConfig extends Omit<IRouteConfig, 'component' | 'routes'> {
    routes?: RouteComponentConfig[];
    component?: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
}

type IRoute = any;
/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */

export function flattenRoute(routeList: IRoute[], deep: boolean, auth: boolean): IRoute[] {
    const result: IRoute[] = [];

    for (let i = 0; i < routeList.length; i += 1) {
        const route = routeList[i];

        result.push({
            ...route,
        });

        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep, auth));
        }
    }

    return result;
}

function getLayoutRouteList(): IRoute[] {
    return flattenRoute(routes, false, false);
}

function getBusinessRouteList(): IRoute[] {
    const routeList = routes.filter((route) => route.path === '/');

    if (routeList.length > 0) {
        return flattenRoute(routeList, true, true);
    }
    return [];
}

function getSystemRouteList(): IRoute[] {
    const routeList = routes.filter((route) => route.path === '/admin');

    if (routeList.length > 0) {
        return flattenRoute(routeList, true, false);
    }
    return [];
}

function getAllRouteList(): IRoute[] {
    const list = flattenRoute(routes, true, false);
    const routerMap: any = {};
    list.map((item) => {
        if (item.path) {
            routerMap[item.path] = item;
        }
        return item;
    });
    return routerMap;
}

export function OtherFlattenRoute(routeList: IRoute[]): IRoute[] {
    const arr = R.clone(routeList);
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].children) {
            OtherFlattenRoute(arr[i].children);
        } else if (arr[i].index) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

//  获取最终层级菜单集合
const allRoutes = (arr: IRoute[]): IRoute[] =>
    // eslint-disable-next-line no-prototype-builtins
    arr.reduce((prev: any, cur: any) => prev.concat(cur.hasOwnProperty('routes') ? allRoutes(cur.routes) : cur), []);

export const getAllRouteMap = (arr: IRoute[]) => {
    const items = allRoutes(arr);
    const map = new Map();
    items.map((item: IRoute) => {
        if (item.index || !item.path) return item;
        map.set(item.path, item);
        return item;
    });
    return map;
};
/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，
 * 第二个: 业务路由，为 / 路由下的业务路由
 * 第三个: 当前主路由下所有...级路由拍扁
 * 第四个: 当前主路由下，去除所有存在index的对象
 */
export const layoutRouteList = getLayoutRouteList();

export const businessRouteList = getBusinessRouteList();

export const systemRouteList = getSystemRouteList();

export const allRouteList: any = getAllRouteList();
