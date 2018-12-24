import { Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_600 } from '@/configs';

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
        color: ${COLOR_PRIMARY_600};
    }
`;

export interface LoadingProps {
    readonly style?: React.CSSProperties;
}

export function Loading(props: LoadingProps) {
    const { style } = props;
    return (
        <LoadingWrapper style={style}>
            <Icon type="loading" spin={true} />
            <span>Đang tải dữ liệu, đợi xíu...</span>
        </LoadingWrapper>
    );
}
