import { Button, Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { setStorage } from '@/utils/util';

import cls from './index.module.less';

const Login: React.FC = function () {
    const navigate = useNavigate(); // 跳转
    return (
        <div className={cls.loginBox}>
            <Card className="_bg" bordered={false}>
                <Button
                    type="primary"
                    className={cls.button}
                    onClick={() => {
                        navigate('/admin/home', { replace: true });
                        setStorage('token', '123456');
                    }}
                >
                    登錄
                </Button>
            </Card>
        </div>
    );
};
export default Login;
