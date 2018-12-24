import * as React from 'react';
import JsonView from 'react-json-view';

export interface JsonProps {
    readonly src: object;
}

export function Json(props: JsonProps) {
    const { src } = props;
    return (
        <JsonView src={src} collapsed={true} enableClipboard={false} />
    );
}