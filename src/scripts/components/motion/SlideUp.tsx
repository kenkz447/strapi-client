import './SlideUp.scss';

import * as React from 'react';
import { Motion, spring } from 'react-motion';

export interface SlideUpProps {
    readonly style?: React.CSSProperties;
    readonly children: React.ReactNode;
}

const config = { stiffness: 200, damping: 25 };
const toCSS = ({ translateY, opacity, ...rest }): React.CSSProperties => {
    return {
        transform: `translateY(${translateY}px)`,
        opacity: opacity,
        ...rest
    };
};

export function SlideUp(props: SlideUpProps) {
    const { style } = props;
    return (
        <Motion
            defaultStyle={{
                translateY: 50,
                opacity: 0
            }}
            style={{
                translateY: spring(0, config),
                opacity: spring(1, config),
            }}
        >
            {
                (value) => (
                    <div
                        className="motion-slide-up"
                        style={toCSS({
                            translateY: value.translateY,
                            opacity: value.opacity,
                            ...style
                        })}
                    >
                        {props.children}
                    </div>
                )
            }
        </Motion>
    );
}
