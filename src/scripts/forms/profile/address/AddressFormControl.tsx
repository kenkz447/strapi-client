import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import {
    FormikControlBase,
    FormikControlBaseProps,
    Loading
} from '@/components';
import { City, cityResources, request } from '@/restful';

import { AddressForm, AddressFormValues } from './address-form-control';
import { AddressFormContext } from './address-form-control';

interface AddressFormControlProps extends FormikControlBaseProps<AddressFormValues> {
    readonly initialValues?: AddressFormValues;
}

interface AddressFormControlState {
    readonly allowLoad: boolean;
    readonly addressFormContext: {
        readonly cityOptions: OptionProps[];
        readonly cities: City[];
    };
}

export class AddressFormControl extends FormikControlBase<
    AddressFormValues,
    AddressFormControlProps,
    AddressFormControlState> {
    constructor(props: AddressFormControlProps) {
        super(props);
        this.state = {
            allowLoad: false,
            addressFormContext: {
                cities: [],
                cityOptions: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [cities] = await Promise.all([
            request(cityResources.find),
        ]);

        this.setState({
            allowLoad: true,
            addressFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const { addressFormContext, allowLoad } = this.state;

        if (!allowLoad) {
            return <Loading />;
        }

        return (
            <AddressFormContext.Provider value={addressFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <AddressForm
                            {...formProps}
                        />
                    )}
                </Formik>
            </AddressFormContext.Provider>
        );
    }
}