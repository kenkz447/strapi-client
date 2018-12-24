import './SlideRight.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import { Motion, spring } from 'react-motion';

export interface SlideRightProps {
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: React.ReactNode;
}

const config = { stiffness: 200, damping: 25 };
const toCSS = ({ translateX, opacity, ...style }): React.CSSProperties => {
    return {
        transform: `translateX(${translateX}px)`,
        opacity: opacity,
        ...style
    };
};

export function SlideRight(props: SlideRightProps) {
    const { style, className } = props;
    const childClassname = classNames('motion-slide-right', className);
    return (
        <Motion
            defaultStyle={{
                translateX: -50,
                opacity: 0
            }}
            style={{
                translateX: spring(0, config),
                opacity: spring(1, config),
            }}
        >
            {
                (value) => (
                    <div
                        className={childClassname}
                        style={toCSS({
                            translateX: value.translateX,
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
