import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { AppCoreContext, BreakPoint } from '../core/Types';

export interface BreakpointDetectorProps {
    readonly resolver?: (windowWidth: number) => BreakPoint;
}

class BreakpointDetector extends React.PureComponent<WithContextProps<AppCoreContext, BreakpointDetectorProps>> {
    static readonly defaultProps: Partial<BreakpointDetectorProps> = {
        resolver: (windowWith: number) => {
            if (windowWith >= 1600) {
                return 'xxl';
            }

            if (windowWith >= 1200) {
                return 'xl';
            }

            if (windowWith >= 1200) {
                return 'xl';
            }

            if (windowWith >= 992) {
                return 'lg';
            }

            if (windowWith >= 768) {
                return 'md';
            }

            if (windowWith >= 576) {
                return 'sm';
            }

            return 'xs';
        }
    };

    constructor(props: WithContextProps<AppCoreContext, BreakpointDetectorProps>) {
        super(props);
        this.onWindowResize();
    }

    readonly onWindowResize = () => {
        const { resolver, setContext } = this.props;
        const nextBreakpoint = resolver!(window.innerWidth);

        setContext({
            currentBreakpoint: nextBreakpoint
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    render() {
        return this.props.children || null;
    }
}

export default withContext<AppCoreContext, BreakpointDetectorProps>()(BreakpointDetector);