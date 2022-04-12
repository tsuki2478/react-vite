import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoFond: React.FC = function () {
    const navigate = useNavigate(); // 跳转

    const goHome = () => {
        navigate('/admin/home', { replace: true });
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="很抱歉，您访问的页面不存在"
            extra={
                <Button type="primary" onClick={goHome}>
                    返回首页
                </Button>
            }
        />
    );
};

export default NoFond;
