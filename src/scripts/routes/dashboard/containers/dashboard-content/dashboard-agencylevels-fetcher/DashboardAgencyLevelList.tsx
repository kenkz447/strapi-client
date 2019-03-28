import './DashboardAgencyLevelList.scss';

import { MiniProgress } from 'ant-design-pro/lib/Charts';
import { Icon, Tag, Typography } from 'antd';
import maxBy from 'lodash/maxBy';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { DomainContext } from '@/domain';
import { AgencyLevel } from '@/restful';
import { formatCurrency } from '@/utilities';

interface DashboardAgencyLevelListProps {
    readonly agencyLevels: AgencyLevel[];
}

export class DashboardAgencyLevelList extends React.PureComponent<DashboardAgencyLevelListProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly getCurrentAgencylevel = () => {
        const { currentAgency } = this.context;

        if (!currentAgency) {
            return;
        }

        const { agencyLevels } = this.props;

        return agencyLevels.find(o => o.id === currentAgency.level.id);
    }

    private readonly getHighestDiscountAgencyLevel = (): AgencyLevel => {
        const { agencyLevels } = this.props;

        return maxBy(agencyLevels, 'discountPercent')!;
    }

    public render() {
        const currentAgencyLevel = this.getCurrentAgencylevel();
        if (!currentAgencyLevel) {
            return null;
        }

        const { agencyLevels } = this.props;
        const highestLevel = this.getHighestDiscountAgencyLevel();

        return (
            <div id="dashboardAgencyLevelList">
                {agencyLevels.map((o, index) => {
                    const isDisabled = index !== currentAgencyLevel.index;
                    const percent = o.discountPercent / highestLevel.discountPercent * 100;

                    return (
                        <div
                            className="agency-level-item"
                            key={o.id}
                            data-disabled={isDisabled}
                        >
                            <img src={getUploadedFileSrc({ uploadedFile: o.icon })} />
                            <div>
                                <div className="display-flex">
                                    <div className="flex-grow-1">
                                        <Typography.Text strong={true}>
                                            {o.name}
                                        </Typography.Text>
                                        <Typography.Paragraph type="secondary">
                                            {
                                                o.index === 0
                                                    ? 'Chào mừng đến với [M]Furniture'
                                                    : `Tổng giao dịch đạt trên ${formatCurrency(o.minPay)}`
                                            }
                                        </Typography.Paragraph>
                                    </div>
                                    <div className="text-right">
                                        <Tag color={isDisabled ? '#f50' : '#87d068'}>{o.discountPercent}% off</Tag>
                                        <div>Trên mỗi đơn hàng</div>
                                    </div>
                                </div>
                                <MiniProgress
                                    percent={percent}
                                    strokeWidth={8}
                                    target={percent}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
