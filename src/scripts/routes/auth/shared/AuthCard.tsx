import * as React from 'react';
import styled from 'styled-components';

import { LOGO_TEXT } from '@/configs';

const AuthCardWrapper = styled.div`
    min-width: 336px;
    max-width: 400px;
        .auth-card {
            &-logo {
                margin-bottom: 14px;
                display: flex;
                img, h1 {
                    display: inline-block;
                    vertical-align: middle;
                }
                img {
                    margin-right: 14px;
                }
            }
        }
`;

interface AuthCardProps {
    readonly children?: React.ReactNode;
    readonly title: string;
    readonly description: string;
}

export function AuthCard(props: AuthCardProps) {
    const { children, title, description } = props;

    return (
        <AuthCardWrapper>
            <div className="auth-card-logo">
                <img alt="Furniture Maker HERE" src={LOGO_TEXT} height={48} />
            </div>
            <div className="auth-card-hello" style={{ marginBottom: 15 }}>
                <h2 style={{ marginBottom: 0, color: 'black' }}>
                    {title}
                </h2>
                <p style={{ color: 'darkgray' }}>
                    {description}
                </p>
            </div>
            <div>
                {children}
            </div>
        </AuthCardWrapper>
    );
}