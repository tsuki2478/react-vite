import { Spin } from 'antd';
import React from 'react';

function Loading() {
    return (
        <div className="spin">
            <Spin size="large" delay={400} />
        </div>
    );
}

export default Loading;
