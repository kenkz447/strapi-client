import { Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY } from '@/configs';

const LoadingWrapper = styled.div`
    min-width: 200px;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i {
        font-size: 20px;
        margin-bottom: 20px;
        color: ${COLOR_PRIMARY};
    }
`;

export interface LoadingProps {
    readonly style?: React.CSSProperties;
    readonly delayMS?: number;
    readonly children?: React.ReactNode;
}

export function Loading(props: LoadingProps) {
    const { style, delayMS, children } = props;

    const [canRender, setCanRender] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(
            () => {
                setCanRender(true);
            },
            delayMS
        );
        
        return () => clearTimeout(timeout);
    });

    if (!canRender) {
        return null;
    }

    return (
        <LoadingWrapper style={style}>
            <Icon type="loading" spin={true} />
            <span>
                {children}
            </span>
        </LoadingWrapper>
    );
}

Loading.defaultProps = {
    delayMS: 500,
    children: 'Đang tải dữ liệu, đợi xíu...'
};