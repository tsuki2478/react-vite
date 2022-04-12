import { APP_TITLE } from '@config/index';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { allRouteList } from '@/routes/utils';

const title = APP_TITLE;

const Authority: React.FC = function ({ children }) {
    const { pathname } = useLocation();

    if (!localStorage.getItem('token') && pathname !== '/user/login') {
        window.location.href = `${window.location.protocol}//${window.location.host}/user/login`;
    }
    if (allRouteList[pathname]) {
        document.title = `${allRouteList[pathname].title} - ${title}` || title;
    }

    return <>{children}</>;
};

export default Authority;
