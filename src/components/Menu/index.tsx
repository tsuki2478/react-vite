import { Layout, Menu } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import routes, { IRouteConfig } from '@/routes/route';
import { OtherFlattenRoute } from '@/routes/utils';

import styled from './index.module.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

// 所有路由都是嵌套式， 登录成功之后，所有路由皆是admin的子集..
const FilterRoutes = (arr: IRouteConfig[]): IRouteConfig[] => {
    const list = arr.find((n) => n.path === '/admin')?.children || [];
    return OtherFlattenRoute(list);
};

// 默认全部展开
const filterPath = (arr: IRouteConfig[]) => {
    const newArr = arr.find((n) => n.path === '/admin')?.children || [];
    const paths: any = [];
    newArr.map((item) => {
        paths.push(item.path);
        return item;
    });
    return paths;
};

const Header: React.FC = function () {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    // const [selectedKeys, setSelectedKeys] = useState<string[]>(filterPath(routes));
    const adminRoutes = FilterRoutes(routes);
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    // 路由监听
    useEffect(() => {
        if (openKeys.length === 0 || pathname !== openKeys[0]) {
            setOpenKeys([pathname]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Sider
            width={208}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            className={clsx({
                [styled.menu]: true,
            })}
        >
            <Menu mode="inline" selectedKeys={openKeys} defaultOpenKeys={filterPath(routes)}>
                {adminRoutes.map((item) =>
                    item.children && item.children.length > 0 ? (
                        <SubMenu key={item.path} title={item.title} icon={item.icon}>
                            {item.children.map((item2) => (
                                <Item key={item2.path}>
                                    <Link to={String(item2.path)}>{item2.title}</Link>
                                </Item>
                            ))}
                        </SubMenu>
                    ) : (
                        <Item key={item.path} icon={item.icon}>
                            <Link to={String(item.path)}>{item.title}</Link>
                        </Item>
                    )
                )}
            </Menu>
        </Sider>
    );
};
export default Header;
