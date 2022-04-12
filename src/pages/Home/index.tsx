import { Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

function HomePage() {
    const [value, setValue] = useState(''); // 用户输入

    const onChange = (e: { target: { value: any } }) => {
        setValue(e.target.value);
    };
    return (
        <Card>
            <TextArea
                value={value}
                onChange={onChange}
                placeholder="请按一段一句录入歌词10000字以内"
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Card>
    );
}

export default observer(HomePage);
