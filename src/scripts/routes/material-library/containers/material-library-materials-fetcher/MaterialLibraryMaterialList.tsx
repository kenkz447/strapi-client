import { Card, Icon, List } from 'antd';
import * as React from 'react';

import { BusinessController } from '@/business';
import { deleteExternalMaterial } from '@/business/furniture-material';
import { Img } from '@/components';
import { FurnitureMaterial } from '@/restful';

interface MaterialLibraryMaterialListProps {
    readonly loading: boolean;
    readonly furnitureMaterials: FurnitureMaterial[];
}

export class MaterialLibraryMaterialList extends React.PureComponent<MaterialLibraryMaterialListProps> {
    public render() {
        const { furnitureMaterials, loading } = this.props;
        return (
            <List
                loading={loading}
                grid={{ gutter: 16, column: 6 }}
                dataSource={furnitureMaterials}
                renderItem={(item: FurnitureMaterial) => {
                    return (
                        <List.Item>
                            <Card
                                bordered={false}
                                size="small"
                                actions={[
                                    <BusinessController
                                        key="delete"
                                        action={deleteExternalMaterial}
                                        needsConfirm={true}
                                    >
                                        {({ doBusiness }) => {
                                            return (
                                                <Icon
                                                    type="delete"
                                                    onClick={() => doBusiness(item)}
                                                />
                                            );
                                        }}
                                    </BusinessController>

                                ]}
                                cover={(
                                    <Img
                                        className="w-100"
                                        file={item.texture}
                                        size="img512x512"
                                    />
                                )}
                            >
                                <Card.Meta
                                    title={item.materialType.displayName}
                                    description={item.displayName}
                                />
                            </Card>
                        </List.Item>
                    );
                }}
            />
        );
    }
}
