import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { setCurrentLanguage } from '@/i18n';

import { AppCoreContext } from '../core';

// tslint:disable-next-line:interface-name
interface I18NState {
    readonly currentLanguage: string;
    readonly needsUpdate?: boolean;
}

type I18NLoaderContext = Pick<AppCoreContext, 'currentLanguage'>;

class I18NLoader extends React.PureComponent<WithContextProps<I18NLoaderContext>, I18NState> {
    static getDerivedStateFromProps(
        nextProps: WithContextProps<I18NLoaderContext>,
        state: I18NState
    ): I18NState | null {
        if (nextProps.currentLanguage !== state.currentLanguage) {
            return {
                currentLanguage: nextProps.currentLanguage!,
                needsUpdate: true
            };
        }
        return null;
    }

    constructor(props: WithContextProps<I18NLoaderContext>) {
        super(props);
        this.state = {
            currentLanguage: props.currentLanguage
        };
    }

    componentDidUpdate() {
        if (!this.state.needsUpdate) {
            return;
        }

        setCurrentLanguage(this.state.currentLanguage);
            
        this.setState({
            needsUpdate: false
        });
    }

    render() {
        if (this.state.needsUpdate) {
            return null;
        }

        return this.props.children;
    }
}

export default withContext<I18NLoaderContext>('currentLanguage')(I18NLoader);