import * as React from 'react';
import styled from 'styled-components';

import { RouteInfo } from '@/app';
import { SlideUp } from '@/components';
import { LOGIN_URL, LOGO } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { LoginFormControl } from '@/forms';
import { text } from '@/i18n';

const LoginPageWrapper = styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;

    .login-card {
        width: 340px;
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

const LoginPageCOntent = styled.div`
    padding: 24px;
`;

type RouteLoginProps = AppPageProps;

export class RouteLogin extends RoutePage<RouteLoginProps> {
    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <LoginPageWrapper>
                <LoginPageCOntent>
                    <SlideUp>
                        <div className="login-card">
                            <div className="login-card-logo">
                                <img alt="Furniture Maker HERE" src={LOGO} width={48} height={48} /> <h1>Furniture Maker</h1>
                            </div>
                            <div className="login-card-hello" style={{ marginBottom: 15 }}>
                                <h2 style={{ marginBottom: 0, color: 'black' }}>
                                    {text('Login')}
                                </h2>
                                <p style={{ color: 'darkgray' }}>
                                    {text('LoginDescription')}
                                </p>
                            </div>
                            <div className="login-card-form">
                                <LoginFormControl />
                            </div>
                        </div>
                    </SlideUp>
                </LoginPageCOntent>
            </LoginPageWrapper>
        );
    }
}