import 'ant-design-pro/lib/Exception/style/css';

import Exception from 'ant-design-pro/lib/Exception';
import { Button, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '../structures';

export const NotFoundPage = () => {
    return (
        <React.Fragment>
            <PageHeader title={null} />
            <Exception
                type="404"
                backText="Về trang tổng quan"
                desc="Trang bạn yêu cầu không tồn tại!"
                linkElement={Link}
            />
        </React.Fragment>
    );
};

interface ErrorPageProps {
    readonly error?: string;
}

export const ErrorPage = (props: ErrorPageProps) => {
    return (
        <Exception
            type="500"
            title=":("
            desc={props.error}
            redirect={location.href}
            actions={
                <div>
                    <div style={{ marginBottom: 15 }}>
                        <Button type="primary" onClick={() => location.reload()} icon="retweet">Tải lại trang</Button>
                        <Button icon="message"> Yêu cầu hỗ trợ</Button>
                    </div>
                    <a href="/"><Icon type="arrow-left" /> Về trang chủ</a>
                </div>
            }
        />
    );
};

ErrorPage.defaultProps = {
    error: 'Tính năng hiện tại không khả dụng!'
};