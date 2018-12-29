// tslint:disable:readonly-keyword
// tslint:disable:no-any

/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />
/// <reference path="node_modules/@types/three" />

declare module '*.scss' {
    const content: unknown;
    export default content;
}

interface Window {
    readonly THREE: THREE;
}

const API_ENTRY: string;
const FILE_HOST: string;