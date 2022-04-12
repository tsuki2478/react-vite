import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { IRouteConfig } from '@/routes/route';

import MyHeader from '../components/Header';
import MyMenu from '../components/Menu';

const { Content } = Layout;

const BasicLayout: React.FC<{ route: IRouteConfig }> = function () {
    return (
        <Layout>
            <MyHeader />
            <Layout>
                <MyMenu />
                <Content style={{ height: 'calc(100vh - 64px)' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;
