import * as React from 'react';
import { ContextCreator } from 'react-context-service';

import { AppCoreContext } from './Types';

export interface RootProps<Context extends AppCoreContext = AppCoreContext> {
    readonly AppContent: React.ComponentType;
    readonly initialContext: Partial<Context>;
}

export const RootContext = React.createContext({});

export class Root extends React.Component<RootProps> {
    // tslint:disable-next-line:readonly-keyword
    static ContextConsumer: React.Consumer<AppCoreContext>;

    componentDidMount() {
        Root.ContextConsumer = ContextCreator.instance.Context.Consumer;
    }

    render() {
        const { AppContent, initialContext } = this.props;

        return (
            <ContextCreator
                context={RootContext}
                initContextValue={initialContext}
            >
                <AppContent />
            </ContextCreator>
        );
    }
}