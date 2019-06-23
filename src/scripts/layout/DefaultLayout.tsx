import { RootContext } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DASHBOARD_BASE_PATH, LOGO_TEXT } from '@/configs';
import { DomainContext } from '@/domain';

import { DefaultLayoutDesktop, DefaultLayoutSiderMenu } from './default-layout';
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
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly header = <DefaultLayoutHeader />;

    render() {
        const { currentUserRole } = this.context;
        const { children } = this.props;

        return (
            <DefaultLayoutWrapper>
                <DefaultLayoutDesktop
                    siderProps={{
                        trigger: null,
                        collapsible: true,
                        children: (
                            <React.Fragment>
                                <div style={{ background: '#002140' }}>
                                    <SiderLogo className="side-logo">
                                        <Link to={(currentUserRole && currentUserRole!.defaultUrl) || DASHBOARD_BASE_PATH}>
                                            <img src={LOGO_TEXT} alt="logo" />
                                        </Link>
                                    </SiderLogo>
                                </div>
                                <DefaultLayoutSiderMenu />
                            </React.Fragment>
                        ),
                        width: 256,
                    }}
                    header={this.header}
                >
                    {children}
                </DefaultLayoutDesktop>
            </DefaultLayoutWrapper>
        );
    }
}