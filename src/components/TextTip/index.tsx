import { Tooltip } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';

import styled from './index.module.less';

type UseTextTip = {
    maxWidth: number;
    message: string;
    className?: string;
    left?: boolean;
};
interface Ref {
    current: HTMLSpanElement | any;
}
/** @param message： 展示信息，也是tip展示信息
 *  @param maxWidth: 当超过这个最大宽度时，鼠标移动过去展示tip
 * @param className :  css-module样式
 */
// eslint-disable-next-line react/display-name
const useTextTip = React.memo(({ maxWidth, message, className, left }: UseTextTip) => {
    const [offWidth, setOffWidth] = useState<number>(0);
    const ref: Ref = useRef();
    useLayoutEffect(() => {
        setOffWidth(Number(ref?.current?.offsetWidth) || 0);
    }, [message, ref]);
    return (
        <div className={`${styled.textContent} ${className}`} style={{ width: maxWidth, textAlign: left ? 'left' : 'inherit' }}>
            <div className={styled.textTip} style={{ width: maxWidth }}>
                <Tooltip placement="topLeft" title={offWidth > maxWidth ? message : ''}>
                    <span style={{ width: 'max-content' }} ref={ref}>
                        {message}
                    </span>
                </Tooltip>
            </div>
        </div>
    );
});

export default useTextTip;
