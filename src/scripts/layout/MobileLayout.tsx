import { Exception } from 'ant-design-pro';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import {
    DASHBOARD_BASE_PATH,
    LOGO_TEXT,
    MOBILE_URL_PREFIX,
    MOBILE_VIEWPORTS
} from '@/configs';
import { DomainContext } from '@/domain';

import { DefaultLayoutSiderMenu } from './default-layout';
import { DefaultLayoutHeader } from './default-layout';
import {
    MobileLayoutContent,
    MobileLayoutHeader,
    MobileLayoutSiderMenu
} from './mobile-layout';

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

type MobileLayoutProps =
    Pick<DomainContext, 'currentBreakpoint'> &
    Pick<DomainContext, 'history'>;

export class MobileLayout extends React.PureComponent<MobileLayoutProps> {
    readonly isMobileViewport = () => {
        const { currentBreakpoint } = this.props;
        return MOBILE_VIEWPORTS.includes(currentBreakpoint);
    }

    readonly onMenuItemClick = (url: string) => {
        const { history } = this.props;
        history.push(url);
    }

    private readonly siderContent = (
        <React.Fragment>
            <div style={{ background: '#002140' }}>
                <SiderLogo className="side-logo">
                    <Link to={DASHBOARD_BASE_PATH}>
                        <img src={LOGO_TEXT} alt="logo" />
                    </Link>
                </SiderLogo>
            </div>
            <MobileLayoutSiderMenu
                menuName="MAIN_MOBILE"
            />
        </React.Fragment>
    );

    private readonly header = <MobileLayoutHeader />;

    render() {
        const { children, history } = this.props;
        const isMobile = this.isMobileViewport();

        if (!isMobile) {
            return <Redirect to={location.pathname.replace(MOBILE_URL_PREFIX, '')} />;
        }

        return (
            <DefaultLayoutWrapper>
                <MobileLayoutContent
                    siderProps={{
                        trigger: null,
                        width: 256,
                        children: this.siderContent
                    }}
                    header={this.header}
                    history={history}
                >
                    {children}
                </MobileLayoutContent>
            </DefaultLayoutWrapper>
        );
    }
}