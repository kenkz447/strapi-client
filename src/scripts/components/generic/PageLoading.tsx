import { Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY } from '@/configs';

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
        color: ${COLOR_PRIMARY};
    }
`;

export interface PageLoadingProps {
    readonly delayMS?: number;
}

export function PageLoading(props: PageLoadingProps) {
    const { delayMS } = props;

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
        <PageLoadingWrapper>
            <Icon type="loading" spin={true} />
            <span>Đang tải trang, đợi xíu...</span>
        </PageLoadingWrapper>
    );
}

PageLoading.defaultProps = {
    delayMS: 500
};