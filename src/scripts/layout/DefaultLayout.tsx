import { Exception } from 'ant-design-pro';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DASHBOARD_BASE_PATH, DASHBOARD_URL, LOGO_TEXT } from '@/configs';
import { DomainContext } from '@/domain';

import {
    DefaultLayoutDesktop,
    DefaultLayoutMobile,
    DefaultLayoutSiderMenu
} from './default-layout';
import { DefaultLayoutHeader } from './default-layout';

const DefaultLayoutWrapper = styled.div`
    --sider-width: 200px;
    --sider-width-collapse: 80px;
    height: 100vh;
    .ant-drawer-body {
        padding: 0px;
        height: 100vh;
    }
    .sider-trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }
`;

const SiderLogo = styled.div`
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    transition: all .3s;
    background: #002140;
    overflow: hidden;
    img {
        display: inline-block;
        vertical-align: middle;
        height: 32px;
        filter: invert(100%);
    }

    h1 {
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-weight: 600;
    }
`;

type DefaultLayoutProps =
    Pick<DomainContext, 'currentBreakpoint'> &
    Pick<DomainContext, 'history'>;

export class DefaultLayout extends React.PureComponent<DefaultLayoutProps> {
    readonly isMobileViewport = () => {
        const { currentBreakpoint } = this.props;
        if (['xs', 'sm', 'md'].includes(currentBreakpoint)) {
            return true;
        }

        return false;
    }

    readonly onMenuItemClick = (url: string) => {
        const { history } = this.props;
        history.push(url);
    }

    private readonly siderContent = (
        <React.Fragment>
            <SiderLogo className="side-logo">
                <Link to={DASHBOARD_BASE_PATH}>
                    <img src={LOGO_TEXT} alt="logo" />
                </Link>
            </SiderLogo>
            <DefaultLayoutSiderMenu
                onMenuItemClick={this.onMenuItemClick}
            />
        </React.Fragment>
    );

    private readonly header = <DefaultLayoutHeader />;

    render() {
        const { children, history } = this.props;
        const isMobile = this.isMobileViewport();

        return (
            <DefaultLayoutWrapper>
                {
                    isMobile ?
                        (
                            <div style={{ padding: 24 }}>
                                <Exception
                                    type="403"
                                    // tslint:disable-next-line:max-line-length
                                    desc="Thiết bị hiện tại của bạn chưa được hỗ trợ, vui lòng xử dụng máy tính để bàn!"
                                />
                            </div>
                        ) :
                        (
                            <DefaultLayoutDesktop
                                siderProps={{
                                    trigger: null,
                                    collapsible: true,
                                    children: this.siderContent,
                                    width: 256,
                                }}
                                header={this.header}
                            >
                                {children}
                            </DefaultLayoutDesktop>
                        )
                }
            </DefaultLayoutWrapper>
        );
    }
}