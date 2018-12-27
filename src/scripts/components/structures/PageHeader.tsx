import 'ant-design-pro/lib/PageHeader/style/css';

import { PageHeader as AntdPageHeader } from 'ant-design-pro';
import { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import { Link } from 'react-router-dom';

export class PageHeader extends React.PureComponent<IPageHeaderProps> {
    static readonly defaultProps = {
        linkElement: Link
    };

    render() {
        return <AntdPageHeader {...this.props} />;
    }
}