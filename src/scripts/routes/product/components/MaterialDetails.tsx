import { Col, Row } from 'antd';
import map from 'lodash/map';
import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { COLOR_PRIMARY } from '@/configs';
import { FurnitureMaterial } from '@/restful';

const MaterialDetailsWrapper = styled.div`
    .material-details {
        color: #000;
        &-item {
            &-label {
                font-weight: bold;
                display: inline-block;
                width: 150px;
            }
        }
    }
`;

export interface MaterialDetailsProps {
    readonly material: FurnitureMaterial;
}

export class MaterialDetails extends React.PureComponent<MaterialDetailsProps> {
    public render() {
        const { material } = this.props;

        return (
            <MaterialDetailsWrapper>
                <Row gutter={30}>
                    <Col span={12}>
                        <div>
                            <Img className="w-100" file={material.thumbnail || material.texture} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <h2 style={{ color: COLOR_PRIMARY }}>{material.displayName || material.name}</h2>
                        <div className="material-details">
                            {
                                map(material.details, (value, key) => {
                                    return (
                                        <div key={key} className="material-details-item">
                                            <span className="material-details-item-label">{key}</span> {value}
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </Col>
                </Row>
            </MaterialDetailsWrapper>
        );
    }
}
