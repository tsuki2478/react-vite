import 'antd/dist/antd.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from '@/store';

import App from './App';

// StrictMode 开启react严格模式
ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById('root')
);
