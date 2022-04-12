// import logo from '@assets/logo.jpg';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import styled from './index.module.less';

const { Header } = Layout;

const MyHeader: React.FC = function () {
    const handleChange = (e: { key: string }) => {
        if (e.key === '0') {
            localStorage.removeItem('token');
            window.location.href = '/user/login';
        }
    };

    const menu = (
        <Menu onClick={handleChange}>
            <Menu.Item key="0" icon={<LogoutOutlined />}>
                <span>退出登录</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <Header className={styled.layout_header}>
            <Link to="/" className={styled.header} />
            <Dropdown overlay={menu}>
                <Space>
                    <Avatar src={new URL('../../assets/logo.jpg', import.meta.url).href} />
                    name
                </Space>
            </Dropdown>
        </Header>
    );
};

export default MyHeader;
