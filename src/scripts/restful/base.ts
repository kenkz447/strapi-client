import { RequestParameter } from 'react-restful';

export interface FetchEventArgs {
    readonly url: string;
    readonly method?: string;
}

export interface DefaultMeta {
    readonly message?: string;
}

export const getDefaultParamsForUpdate = (params: RequestParameter[]): RequestParameter | never => {
    const requestBody = params.find(o => o.type === 'body')!;
    if (!requestBody) {
        throw new Error('Missing body params!');
    }

    const bodyValue = requestBody.value as { readonly id: number };
    if (!requestBody) {
        throw new Error('Missing body value!');
    }

    return {
        type: 'path',
        parameter: 'id',
        value: bodyValue.id!
    };
};