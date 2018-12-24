import * as React from 'react';

import { ErrorPage } from '@/components';

export class ErrorLogger extends React.PureComponent {
    readonly state = {
        error: null
    };

    componentDidCatch(error: Error, info: object) {
        this.setState({
            error: error
        });
    }

    render() {
        const { error } = this.state;
        if (!error) {
            return this.props.children;
        }

        return <ErrorPage />;
    }
}