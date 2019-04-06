import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { City, cityResources, request } from '@/restful';

import { AgencyFormContext } from '../agency/agency-create/agency-form-control';
import {
    InvitationCreateForm,
    InvitationCreateFormValues
} from './invitation-create-form-control';

interface InvitationCreateFormControlProps extends FormikControlBaseProps<InvitationCreateFormValues> {
    readonly initialValues?: InvitationCreateFormValues;
}

interface InvitationCreateFormControlState {
    readonly agencyFormContext: {
        readonly cityOptions: OptionProps[];
        readonly cities: City[];
    };
}

export class InvitationCreateFormControl extends FormikControlBase<
    InvitationCreateFormValues,
    InvitationCreateFormControlProps,
    InvitationCreateFormControlState> {

    constructor(props: InvitationCreateFormControlProps) {
        super(props);

        this.state = {
            agencyFormContext: {
                cities: [],
                cityOptions: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [cities] = await Promise.all([
            request(cityResources.find)
        ]);

        this.setState({
            agencyFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const { agencyFormContext } = this.state;

        return (
            <AgencyFormContext.Provider value={agencyFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <InvitationCreateForm
                            {...formProps}
                        />
                    )}
                </Formik>
            </AgencyFormContext.Provider>
        );
    }
}