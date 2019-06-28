import { Button } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { DomainContext } from '@/domain';

const Product3DComponentSwitchWrapper = styled.div`
    padding: 24px;
    display: flex;
    line-height: 30px;
`;

export interface Product3DComponentSwitchProps {
}

export class Product3DComponentSwitch extends React.PureComponent<Product3DComponentSwitchProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    public readonly onPrevClick = () => {
        const { selectedFurnitureComponent, select3DObject, scene } = this.context;

        if (!selectedFurnitureComponent) {
            return;
        }

        const furnitureObjects = scene.children.filter(o => o.type === 'Group');
        const currentSelectedIndex = furnitureObjects.findIndex(o => o.name === selectedFurnitureComponent.id);

        const nextObject3D = currentSelectedIndex === 0
            ? furnitureObjects[furnitureObjects.length - 1]
            : furnitureObjects[currentSelectedIndex - 1];

        select3DObject(nextObject3D);
    }

    public readonly onNextClick = () => {
        const { selectedFurnitureComponent, select3DObject, scene } = this.context;

        if (!selectedFurnitureComponent) {
            return;
        }

        const furnitureObjects = scene.children.filter(o => o.type === 'Group');
        const currentSelectedIndex = furnitureObjects.findIndex(o => o.name === selectedFurnitureComponent.id);

        if (currentSelectedIndex === furnitureObjects.length - 1) {
            select3DObject(furnitureObjects[0]);
            return;
        }

        select3DObject(furnitureObjects[currentSelectedIndex + 1]);
    }

    public render() {
        const { selectedFurnitureComponentType } = this.context;

        if (!selectedFurnitureComponentType) {
            return null;
        }

        return (
            <Product3DComponentSwitchWrapper>
                <div className="flex-grow-1">
                    {selectedFurnitureComponentType.name}
                </div>
                <div>
                    <Button.Group>
                        <Button onClick={this.onPrevClick} icon="left" />
                        <Button onClick={this.onNextClick} icon="right" />
                    </Button.Group>
                </div>
            </Product3DComponentSwitchWrapper>
        );
    }
}
