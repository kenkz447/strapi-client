import { Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_600 } from '@/configs';

const PageLoadingWrapper = styled.div`
    height: 100%;
    width:100%;
    position: absolute;
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

export interface PageLoadingProps {
}

export function PageLoading(props: PageLoadingProps) {
    return (
        <PageLoadingWrapper>
            <Icon type="loading" spin={true} />
            <span>Đang tải dữ liệu, đợi xíu...</span>
        </PageLoadingWrapper>
    );
}
