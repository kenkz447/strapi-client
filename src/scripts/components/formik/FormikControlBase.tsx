import { Formik, FormikBag, isPromise } from 'formik';
import * as React from 'react';
import { SchemaError } from 'react-restful';

import { FormTreeSelectOption } from './FormTreeSelect';

export interface FormikControlBaseProps<V> {
    readonly submit: (formValue: V) => Promise<{}>;
}

interface ListItem {
    readonly id?: number | string;
    readonly name: string;
}

export class FormikControlBase<V, P extends FormikControlBaseProps<V>, S = {}> extends React.PureComponent<P, S> {
    readonly formInstance = React.createRef<Formik<V>>();

    static readonly defaultProps = {
        initialValues: {}
    };

    public readonly listToOptions = (list: Array<ListItem>) => {
        return list.map(o => ({ value: o.id, title: o.name }));
    }

    public readonly listToTreeOptions = (
        parentKeys: string[],
        ...dataLists: Array<ListItem[]>
    ): FormTreeSelectOption[] => {
        let options: FormTreeSelectOption[] = [];
        dataLists.forEach((dataList, index) => {
            options = [
                ...options,
                ...dataList.map((o): FormTreeSelectOption => {
                    const parentKey = parentKeys[index];
                    const parent = o[parentKey];
                    let pId = parent || '0';

                    return {
                        id: o.id,
                        value: o.id,
                        title: o.name,
                        pId: pId
                    };
                })
            ];
        });
        return options;
    }

    readonly beforeSubmit!: (values: V, formiKBag: FormikBag<P, V>) => Promise<V>;

    readonly onSubmit = async (
        values: V,
        formiKBag: FormikBag<P, V>
    ) => {
        const { submit } = this.props;
        try {
            let requestBody = values;
            if (this.beforeSubmit) {
                requestBody = await this.beforeSubmit(values, formiKBag);
            }

            await submit(requestBody);
        } catch (error) {
            if (error instanceof SchemaError) {
                // tslint:disable-next-line:no-any
                return void formiKBag.setErrors(error.errors as any);
            }

            if (isPromise(error)) {
                error.then(result => {
                    formiKBag.setStatus({
                        error: result
                    });
                });
                return;
            }

            formiKBag.setStatus({
                error: error.toString()
            });

        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}