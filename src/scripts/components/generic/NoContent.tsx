import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_600 } from '@/configs';
import { text } from '@/i18n';

const NoContentWrapper = styled.div`
    min-height: 200px;
    text-align: center;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    .no-content-icon {
        font-size: 60px;
        height: 90px;
        width: 90px;
        border-radius: 50%;
        background: ${COLOR_PRIMARY_600};
    }
    .no-content-title {
        font-weight: bold;
        color: black;
        font-size: 20px;
        line-height: 1.8;
    }
    .no-content-description {
        color: gray;
        text-align: center;
        max-width: 300px;
    }
`;

interface NoContentProps {
    readonly children?: string;
    readonly title?: string;
    readonly icon?: React.ReactNode;
}
export function NoContent(props: NoContentProps) {
    const { icon, title } = props;
    return (
        <NoContentWrapper>
            {icon && (
                <div className="no-content-icon">
                    {icon}
                </div>
            )}
            {
                title && (
                    <span className="no-content-title">{title}</span>
                )
            }
            <p className="no-content-description">
                {text(props.children)}!
            </p>
        </NoContentWrapper>
    );
}

NoContent.defaultProps = {
    children: 'Không tìm thấy dữ liệu!'
};