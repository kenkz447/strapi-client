import * as React from 'react';

import { ErrorPage } from '@/components';

export class ErrorLogger extends React.PureComponent {
    readonly state = {
        error: null
    };

    private readonly logging = (error: Error, info: object) => {
        // logic
    }

    public componentDidCatch(error: Error, info: object) {
        this.setState({
            error: error
        });
    }

    public render() {
        const { error } = this.state;
        if (!error) {
            return this.props.children;
        }

        return <ErrorPage />;
    }
}