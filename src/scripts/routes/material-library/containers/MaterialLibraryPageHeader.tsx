import * as React from 'react';

import { PageHeader } from '@/components';
import { MaterialCreateFormButton } from '@/forms/material';
import { text } from '@/i18n';
import { FurnitureMaterialType } from '@/restful';

export interface MaterialLibraryPageHeaderProps {
    readonly title: string;
    readonly materialTypes?: FurnitureMaterialType[];
}

export class MaterialLibraryPageHeader extends React.PureComponent<MaterialLibraryPageHeaderProps> {
    public static readonly defaultProps = {
        materialTypes: []
    };

    private readonly getTabList = () => {
        const { materialTypes } = this.props;

        return [{
            key: 'self',
            tab: text('Uploaded')
        }];
    }

    private readonly renderHeaderActions = () => {
        return (
            <div className="button-group">
                <MaterialCreateFormButton>
                    {text('Upload material')}
                </MaterialCreateFormButton>
            </div>
        );
    }

    public render() {
        const { title } = this.props;

        return (
            <PageHeader
                title={title}
                content="Danh mục vật liệu để bạn có thể sử dụng thay thế cho vật liệu từ hệ thống [M]Furniture."
                action={this.renderHeaderActions()}
                tabList={this.getTabList()}
                breadcrumbList={[{
                    title: text('Dashboard'),
                    href: '/'
                }, {
                    title: title
                }]}
            />
        );
    }
}
