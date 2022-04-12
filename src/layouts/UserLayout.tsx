import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import type { IRouteConfig } from '@/routes/route';

const { Content } = Layout;

const UserLayout: React.FC<{ route: IRouteConfig }> = function () {
    return (
        <Layout className="_bg">
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};
export default UserLayout;
