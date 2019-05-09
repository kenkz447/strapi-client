import * as React from 'react';
import styled from 'styled-components';

import { Img } from '@/components';
import { text } from '@/i18n';
import { UploadedFile } from '@/restful';

const ContactProductGroupIconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
    }
`;

interface ContactProductGroupIconsProps {
    readonly icons: UploadedFile[];
}

export class ContactProductGroupIcons extends React.PureComponent<ContactProductGroupIconsProps> {
    private readonly pickRandomIcon = () => {
        const { icons } = this.props;
        return icons[Math.floor(Math.random() * icons.length)];
    }
    public render() {
        const randomIcon = this.pickRandomIcon();

        return (
            <ContactProductGroupIconsWrapper>
                {
                    randomIcon
                        ? <Img file={randomIcon} />
                        : text('No data found')
                }
            </ContactProductGroupIconsWrapper>
        );
    }
}