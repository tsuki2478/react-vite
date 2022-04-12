import { Card } from 'antd';
import React from 'react';

import { useStores } from '@/store';

function AboutPage() {
    const { global } = useStores();
    return <Card>{global.secondsPassed}</Card>;
}

export default AboutPage;
