import { HomeOutlined } from '@ant-design/icons';
// import * as allIcons from '@ant-design/icons'; // 如果引入allIcons则会增加500KIB左右大小, 推荐通过switch，逐个对应。
import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '@/components/Loadding';

export interface IRouteConfig {
    path?: string;
    title?: string;
    element?: any;
    index?: boolean;
    icon?: any;
    children?: IRouteConfig[];
}

const routeList: IRouteConfig[] = [
    {
        path: '/user',
        title: '用户路由',
        element: () => import('@/layouts/UserLayout'),
        children: [
            {
                path: '/user/login',
                element: () => import('@/pages/User/Login'),
                title: '登录',
            },
        ],
    },
    {
        path: '/admin',
        element: () => import('@/layouts/BasicLayout'),
        title: '系统路由',
        children: [
            {
                index: true,
                element: <Navigate to="/admin/home" />,
            },
            {
                path: '/admin/home',
                icon: 'home',
                title: '首页',
                element: () => import('@/pages/Home'),
            },
            {
                path: '/admin/menu',
                title: '菜单一',
                icon: 'home',
                children: [
                    {
                        path: '/admin/menu/about',
                        title: '关于',
                        icon: 'home',
                        element: () => import('@/pages/About'),
                    },
                ],
            },
        ],
    },
    {
        path: '/404',
        title: '404',
        element: () => import('@/pages/Result'),
    },
    {
        path: '/',
        element: <Navigate to="/admin/home" />,
        title: '首页',
    },
    {
        path: '*',
        element: <Navigate to="/404" />,
        title: '404',
    },
];

function LazyElement(props: { importFunc: any }) {
    const { importFunc } = props;
    const LazyComponent = lazy(importFunc);
    return (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    );
}

// const iconType = 'Outlined'; // 默认icon

// 处理routes 如果element是懒加载，要包裹Suspense
function dealRoutes(routesArr: IRouteConfig[]) {
    if (routesArr && Array.isArray(routesArr) && routesArr.length > 0) {
        routesArr.forEach((route) => {
            const { icon, element, children } = route;

            if (element && typeof element === 'function') {
                const importFunc = element;
                route.element = <LazyElement importFunc={importFunc} />;
            }
            if (icon && typeof icon === 'string') {
                // const fixIconName: String = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
                // route.icon = React.createElement((allIcons as any)[fixIconName] || (allIcons as any)[icon]);

                route.icon = <HomeOutlined />; // 或者外部引入，
            }
            if (children) {
                dealRoutes(children);
            }
        });
    }
}

dealRoutes(routeList);

export default routeList;
