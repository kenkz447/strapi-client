import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import {
    agencyLevelResources,
    agencyResources,
    agencyTypeResources,
    City,
    cityResources,
    request
} from '@/restful';

import { AgencyForm, AgencyFormValues } from './agency-form-control';
import { AgencyFormContext } from './agency-form-control';

interface AgencyFormControlProps extends FormikControlBaseProps<AgencyFormValues> {
    readonly initialValues?: AgencyFormValues;
}

interface AgencyFormControlState {
    readonly agencyTypeOptions: OptionProps[];
    readonly agencyLevelOptions: OptionProps[];
    readonly agencyFormContext: {
        readonly cityOptions: OptionProps[];
        readonly cities: City[];
    };
}

export class AgencyFormControl extends FormikControlBase<
    AgencyFormValues,
    AgencyFormControlProps,
    AgencyFormControlState> {
    constructor(props: AgencyFormControlProps) {
        super(props);
        this.state = {
            agencyTypeOptions: [],
            agencyLevelOptions: [],
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
            agencyTypeOptions: this.listToOptions(agencyTypes),
            agencyLevelOptions: this.listToOptions(agencyLevels),
            agencyFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const {
            agencyFormContext,
            agencyLevelOptions,
            agencyTypeOptions
        } = this.state;

        return (
            <AgencyFormContext.Provider value={agencyFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <AgencyForm
                            agencyTypeOptions={agencyTypeOptions}
                            agencyLevelOptions={agencyLevelOptions}
                            {...formProps}
                        />
                    )}
                </Formik>
            </AgencyFormContext.Provider>
        );
    }
}