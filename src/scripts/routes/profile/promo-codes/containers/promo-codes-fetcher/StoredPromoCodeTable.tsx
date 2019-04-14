import { Avatar, List, Tag, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import {
    isStoredPromoCodeExpired,
    isStoredPromoCodeUsed
} from '@/business/stored-promo-code';
import { NoContent, PostContent } from '@/components';
import { DATE_FORMAT } from '@/configs';
import { DomainContext } from '@/domain';
import { copyToClipboard } from '@/effects';
import { text } from '@/i18n';
import { Promotion, StoredPromoCode } from '@/restful';
import { formatDate } from '@/utilities';

const StoredPromoCodeTableWrapper = styled.div`
    margin: 0 0 24px 0;
    max-width: 600px;
`;

export interface StoredPromoCodeTableProps {
    readonly onDelete: () => void;
    readonly storedPromoCodes: StoredPromoCode[];
    readonly loading: boolean;
}

interface StoredPromoCodeTableState {

}

export class StoredPromoCodeTable extends React.PureComponent<StoredPromoCodeTableProps, StoredPromoCodeTableState> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;
    
    constructor(props: StoredPromoCodeTableProps) {
        super(props);
    }

    private readonly onViewPromoDetailClick = (promotion: Promotion) => {
        const { setContext } = this.context;

        if (!promotion.linkedPost) {
            return;
        }

        setContext({
            globalModalVisibled: true,
            globalModal: {
                className: 'full-screen',
                width: 800,
                title: promotion.description,
                closable: false,
                children: (
                    <PostContent
                        postSlug=""
                        postId={
                            typeof promotion.linkedPost === 'string'
                                ? promotion.linkedPost
                                : promotion.linkedPost.id
                        }
                    />
                )
            }
        });
    }
    public render() {
        const { storedPromoCodes } = this.props;

        if (!storedPromoCodes.length) {
            return (<NoContent />);
        }

        return (
            <StoredPromoCodeTableWrapper>
                <List
                    dataSource={storedPromoCodes}
                    renderItem={(storedPromoCode: StoredPromoCode, index: number) => {
                        const isUsed = isStoredPromoCodeUsed(storedPromoCode);
                        const isExpired = isStoredPromoCodeExpired(storedPromoCode);

                        return (
                            <List.Item
                                key={storedPromoCode.id}
                                actions={[
                                    <a
                                        key="content"
                                        onClick={() => this.onViewPromoDetailClick(storedPromoCode.promotion)}
                                    >
                                        {text('Details')}
                                    </a>,
                                    <a
                                        key="copy-code"
                                        onClick={() => copyToClipboard(storedPromoCode.promotion.code)}
                                    >
                                        Copy mã này
                                    </a>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size="large"
                                            icon={isUsed ? 'check' : 'gift'}
                                            style={{
                                                background: isUsed ? '#1890ff' : '#52c41a'
                                            }}
                                        />
                                    }
                                    title={(
                                        <div>
                                            <Typography.Text>
                                                #{storedPromoCode.promotion.code}
                                            </Typography.Text>
                                            <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
                                                &nbsp;- {
                                                    isUsed
                                                        ? storedPromoCode.description
                                                        : isExpired
                                                            ? text('Expired')
                                                            // tslint:disable-next-line:max-line-length
                                                            : text('Ngày hết hạn') + `: ${formatDate(storedPromoCode.expiredAt, DATE_FORMAT)}`

                                                }
                                            </Typography.Text>
                                        </div>
                                    )}
                                    description={(
                                        <div>

                                            <Typography.Paragraph>
                                                {storedPromoCode.promotion.description}
                                            </Typography.Paragraph>
                                            <div>
                                                <Tag
                                                    color={
                                                        isUsed
                                                            ? 'blue'
                                                            : isExpired
                                                                ? '' :
                                                                'green'
                                                    }
                                                >
                                                    {
                                                        isUsed
                                                            ? text('Used')
                                                            : isExpired
                                                                ? text('Expired')
                                                                : text('Availability')
                                                    }
                                                </Tag>
                                            </div>
                                        </div>
                                    )}
                                />
                            </List.Item>
                        );
                    }}
                />
            </StoredPromoCodeTableWrapper >
        );
    }
}
