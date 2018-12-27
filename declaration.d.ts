// tslint:disable:readonly-keyword
// tslint:disable:no-any

/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />

declare module '*.scss' {
    const content: unknown;
    export default content;
}

const API_ENTRY: string;
const FILE_HOST: string;