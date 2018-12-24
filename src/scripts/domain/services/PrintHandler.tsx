import './PrintHandler.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { WithShowPrint } from '../base';

type PrintHandlerState = WithShowPrint;

class PrintHandler extends React.PureComponent<
    WithContextProps<WithShowPrint>,
    PrintHandlerState
    > {
    componentDidMount() {
        const { setContext, showPrint } = this.props;
        if (!showPrint) {
            return;
        }

        window.print();

        setContext({
            showPrint: null
        });
    }

    render() {
        const { showPrint } = this.props;
        const { Component, props } = showPrint!;

        return (
            <div className="print">
                <Component {...props} />
            </div>
        );
    }
}

export default withContext<WithShowPrint>('showPrint')(
    function (props: WithContextProps<WithShowPrint>) {
        if (!props.showPrint) {
            return null;
        }

        return <PrintHandler {...props} />;
    });