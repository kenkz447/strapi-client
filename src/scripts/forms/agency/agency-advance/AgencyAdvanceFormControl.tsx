import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import {
    agencyLevelResources,
    agencyTypeResources,
    City,
    cityResources,
    request
} from '@/restful';

import {
    AgencyAdvanceForm,
    AgencyAdvanceFormValues
} from './agency-advance-form-control';
import { AgencyAdvanceFormContext } from './agency-advance-form-control';

interface AgencyAdvanceFormControlProps extends FormikControlBaseProps<AgencyAdvanceFormValues> {
    readonly initialValues?: AgencyAdvanceFormValues;
}

interface AgencyAdvanceFormControlState {
    readonly allowLoad: boolean;
    readonly agencyLevelOptions: OptionProps[];
    readonly agencyTypeOptions: OptionProps[];
    readonly agencyFormContext: {
        readonly cityOptions: OptionProps[];
        readonly cities: City[];
    };
}

export class AgencyAdvanceFormControl extends FormikControlBase<
    AgencyAdvanceFormValues,
    AgencyAdvanceFormControlProps,
    AgencyAdvanceFormControlState> {
    constructor(props: AgencyAdvanceFormControlProps) {
        super(props);
        this.state = {
            allowLoad: false,
            agencyLevelOptions: [],
            agencyTypeOptions: [],
            agencyFormContext: {
                cities: [],
                cityOptions: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [cities, agencyLevels, agencyTypes] = await Promise.all([
            request(cityResources.find),
            request(agencyLevelResources.find),
            request(agencyTypeResources.find)
        ]);

        this.setState({
            allowLoad: true,
            agencyLevelOptions: this.listToOptions(agencyLevels),
            agencyTypeOptions: this.listToOptions(agencyTypes),
            agencyFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const { agencyFormContext, agencyLevelOptions, agencyTypeOptions, allowLoad } = this.state;

        if (!allowLoad) {
            return null;
        }

        return (
            <AgencyAdvanceFormContext.Provider value={agencyFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <AgencyAdvanceForm
                            agencyLevelOptions={agencyLevelOptions}
                            agencyTypeOptions={agencyTypeOptions}
                            {...formProps}
                        />
                    )}
                </Formik>
            </AgencyAdvanceFormContext.Provider>
        );
    }
}