import { Drawer, Icon, Layout } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { UnregisterCallback } from 'history';
import * as React from 'react';

import { WithHistory } from '@/domain';

export interface DefaultLayoutMobileProps extends WithHistory {
    readonly header: JSX.Element;
    readonly children: React.ReactNode;
    readonly siderProps: SiderProps;
}

export class DefaultLayoutMobile extends React.Component<DefaultLayoutMobileProps> {
    _unListenHistory!: UnregisterCallback;
    _currentLocationPath!: string;

    readonly state = {
        drawerVisibled: false
    };

    readonly onDrawerToggle = () => {
        this.setState({
            drawerVisibled: !this.state.drawerVisibled
        });
    }

    componentDidMount() {
        const { history } = this.props;

        this._currentLocationPath = location.pathname;
        this._unListenHistory = history.listen(o => {
            if (this._currentLocationPath !== location.pathname) {
                if (this.state.drawerVisibled) {
                    this.onDrawerToggle();
                }
            }

            this._currentLocationPath = location.pathname;
        });
    }

    componentWillUnmount() {
        this._unListenHistory();
    }

    render() {
        const { siderProps, children, header } = this.props;
        return (
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Header style={{ background: '#fff', padding: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                className="sider-trigger"
                                type={siderProps.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.onDrawerToggle}
                            />
                            {header}
                        </div>
                    </Layout.Header>
                    <Layout.Content>
                        {children}
                    </Layout.Content>
                </Layout>
                <Drawer
                    placement="left"
                    closable={true}
                    onClose={this.onDrawerToggle}
                    visible={this.state.drawerVisibled}
                    style={{ padding: 0, height: '100vh' }}
                >
                    <Layout.Sider
                        style={{ minHeight: '100vh', zIndex: 10 }}
                        {...siderProps}
                        collapsed={false}
                    />
                </Drawer>
            </React.Fragment>
        );
    }
}