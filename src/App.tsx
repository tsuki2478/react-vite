import '@/style/common.less';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Authority from '@/layouts/Authority';
import RouteList from '@/routes';

const App = function () {
    return (
        <BrowserRouter>
            <Authority>
                <RouteList />
            </Authority>
        </BrowserRouter>
    );
};

export default App;
