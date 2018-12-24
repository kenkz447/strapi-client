import { Pagination } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { PAGE_SIZE } from '@/configs';

const DataModelPaginationWrapper = styled.div`
    text-align: center; 
`;

export interface DataModelPaginationProps {
    readonly currentPage: number;
    readonly totalItem: number;
    readonly pageSize: number;
    readonly onPageChange: (pageNum: number, pageSize: number) => void;
}

interface DataModelPaginationState {
    readonly pageSize: number;
}

const showTotal = (total: number, range: Array<number>) =>
    `Hiển thị từ ${range[0]} đến ${range[1]} trên tổng số ${total}`;

const pageSizeOptions = ['10', '20', '50', '100'];

export class DataModelPagination extends React.PureComponent<
    DataModelPaginationProps,
    DataModelPaginationState
    > {

    static readonly defaultProps = {
        pageSize: PAGE_SIZE,
        currentPage: 1
    };

    constructor(props: DataModelPaginationProps) {
        super(props);
        const { pageSize } = props;
        this.state = {
            pageSize: pageSize
        };
    }

    render() {
        const { currentPage, totalItem, onPageChange } = this.props;
        const { pageSize } = this.state;

        return (
            <DataModelPaginationWrapper>
                <Pagination
                    pageSizeOptions={pageSizeOptions}
                    pageSize={pageSize}
                    onShowSizeChange={(current, nextPageSize) => {
                        onPageChange(1, nextPageSize);
                        this.setState({
                            pageSize: nextPageSize
                        });
                    }}
                    showSizeChanger={true}
                    showTotal={showTotal}
                    current={currentPage}
                    total={totalItem}
                    onChange={(nextPage) => onPageChange(nextPage, pageSize)}
                />
            </DataModelPaginationWrapper>
        );
    }
}