import * as React from 'react';
import styled from 'styled-components';

import { RouteInfo } from '@/app';
import { SlideUp } from '@/components';
import { LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

export class RouteRegister extends RoutePage<RouteRegisterProps> {
    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard>
                            <div />
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}