import './DefaultLayoutDesktop.scss';

import { Icon, Layout } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import * as React from 'react';

export interface DefaultLayoutDesktopProps {
    readonly header: JSX.Element;
    readonly children: React.ReactNode;
    readonly siderProps: SiderProps;
}

export class DefaultLayoutDesktop extends React.PureComponent<DefaultLayoutDesktopProps> {
    readonly state = {
        siderCollapsed: document.body.clientWidth <= 1536
    };

    readonly setSiderCollapsed = (isCollapsed: boolean) => {
        this.setState({
            siderCollapsed: isCollapsed
        });
    }

    render() {
        const { siderProps, children, header } = this.props;
        const { siderCollapsed } = this.state;
        return (
            <Layout className="default-layout-desktop">
                <Layout.Sider
                    className="default-layout-desktop-sider"
                    collapsed={siderCollapsed}
                    {...siderProps}
                />
                <Layout>
                    <Layout.Header className="default-layout-desktop-header">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                className="sider-trigger"
                                type={siderProps.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={() => this.setSiderCollapsed(!siderCollapsed)}
                            />
                            {header}
                        </div>
                    </Layout.Header>
                    <Layout.Content style={{ position: 'relative' }}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}