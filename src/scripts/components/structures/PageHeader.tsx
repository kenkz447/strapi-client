import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { RootContext } from '@/app';
import { DefaultLayoutHeaderProps, DomainContext } from '@/domain';

export class PageHeader extends React.PureComponent<DefaultLayoutHeaderProps> {
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<DomainContext>;

    componentDidMount() {
        const { setContext } = this.context;

        setContext({
            pageHeaderProps: this.props.title ? this.props : null
        });
    }

    componentWillUnmount() {
        const { setContext, pageHeaderProps } = this.context;

        setContext({
            pageHeaderProps: {
                ...pageHeaderProps!,
                actions: null
            }
        });
    }

    render() {
        return null;
    }
}