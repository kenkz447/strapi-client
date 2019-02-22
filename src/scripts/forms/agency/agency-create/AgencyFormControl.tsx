import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import {
    AgencyLevel,
    agencyLevelResources,
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
            agencyLevelOptions: [],
            agencyFormContext: {
                cities: [],
                cityOptions: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [cities, agencyLevels] = await Promise.all([
            request(cityResources.find),
            request(agencyLevelResources.find)
        ]);

        this.setState({
            agencyLevelOptions: this.listToOptions(agencyLevels),
            agencyFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const { agencyFormContext, agencyLevelOptions } = this.state;

        return (
            <AgencyFormContext.Provider value={agencyFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <AgencyForm
                            agencyLevelOptions={agencyLevelOptions}
                            {...formProps}
                        />
                    )}
                </Formik>
            </AgencyFormContext.Provider>
        );
    }
}