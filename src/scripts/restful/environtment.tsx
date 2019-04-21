import * as React from 'react';
import { RequestInfo, setupEnvironment, Store } from 'react-restful';

import { Json } from '@/components/generic/Json';
import { showMessage, showNotification } from '@/effects';
import { dateToString, getToken } from '@/utilities';

import { DefaultMeta } from './base';
import { restfulEmitEvent } from './utils';

const environment = setupEnvironment({
    entry: API_ENTRY,
    store: new Store(),
    requestUrlParamParser: dateToString,
    requestBodyParser: (key, value) => {
        if (value && value.id) {
            return value.id;
        }

        if (value && value._id) {
            return value._id;
        }

        return dateToString(value);
    },
    beforeFetch: (url: string, requestInit: RequestInit) => {
        restfulEmitEvent({
            type: 'START',
            url: url,
            method: requestInit.method
        });

        const requestURL = new URL(url);
        const isLoginRequest = requestURL.pathname.startsWith('/auth/local');

        if (requestInit.headers instanceof Headers && !isLoginRequest) {
            const token = getToken();

            if (token) {
                requestInit.headers.append('Authorization', `Bearer ${token}`);
            }
        }

        return requestInit;
    },
    onRequestSuccess: async (requestInfo: RequestInfo<DefaultMeta>) => {
        const { meta, response, resource } = requestInfo;

        restfulEmitEvent({
            type: 'SUCCESS',
            url: response.url,
            method: resource.props.method
        });

        if (meta && meta.message) {
            showMessage({
                type: 'success',
                content: meta.message
            });
        }
    },
    onRequestFailed: async (requestInfo) => {
        const { response, resource } = requestInfo;

        restfulEmitEvent({
            type: 'FAIL',
            url: response.url,
            method: resource.props.method
        });

        const clonedResponse = response.clone();

        if (clonedResponse.status === 401) {
            return response;
        }

        let error;
        const responseContentType = response.headers.get('Content-Type');
        if (!responseContentType) {
            showNotification({
                type: 'error',
                message: response.status,
                description: response.statusText
            });

            return;
        }

        if (responseContentType!.startsWith('text/plain')) {
            error = await clonedResponse.text();
        } else {
            error = await clonedResponse.json();
        }

        if (requestInfo.meta && !requestInfo.meta['silent']) {
            showNotification({
                type: 'error',
                message: 'Error!',
                description: typeof error === 'string' ? error : <Json src={error} />
            });
        }

        if (error.errorDesc) {
            return error.errorDesc;
        }

        return error;
    },
    // tslint:disable-next-line:no-any
    defaultMapDataToStore: (response: any, resource, resourceType, store) => {
        try {
            if (!response) {
                throw new Error('Something was going wrong here!');
            }

            if (resource.props.method === 'DELETE') {
                return void store.removeRecord(resourceType, response);
            }

            store.dataMapping(resourceType, response);
        } catch (error) {
            showNotification({
                type: 'error',
                message: error.toString()
            });
        }
    },
    onConfirm: (confirmInfo) => {
        return new Promise((resolve, reject) => {
            if (window.confirm(confirmInfo.message)) {
                resolve(true);
            } else {
                reject();
            }
        });
    },
    onSchemaError: (error) => {
        showNotification({
            type: 'error',
            message: 'Schema validation failed!',
            description: <Json src={error.errors} />
        });
    }
});

export const request = environment.request;

export const restfulStore = environment.store;