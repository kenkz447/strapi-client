import { OptionProps } from 'antd/lib/select';
import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';
import {
    AgencyLevel,
    agencyLevelResources,
    City,
    cityResources,
    County,
    request
} from '@/restful';

import {
    AgencyUpdateForm,
    AgencyUpdateFormValues
} from './agency-update-form-control';
import { AgencyUpdateFormContext } from './agency-update-form-control';

interface AgencyUpdateFormControlProps extends FormikControlBaseProps<AgencyUpdateFormValues> {
    readonly initialValues?: AgencyUpdateFormValues;
}

interface AgencyUpdateFormControlState {
    readonly allowLoad: boolean;
    readonly agencyLevelOptions: OptionProps[];
    readonly agencyFormContext: {
        readonly cityOptions: OptionProps[];
        readonly cities: City[];
    };
}

export class AgencyUpdateFormControl extends FormikControlBase<
    AgencyUpdateFormValues,
    AgencyUpdateFormControlProps,
    AgencyUpdateFormControlState> {
    constructor(props: AgencyUpdateFormControlProps) {
        super(props);
        this.state = {
            allowLoad: false,
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
            allowLoad: true,
            agencyLevelOptions: this.listToOptions(agencyLevels),
            agencyFormContext: {
                cities,
                cityOptions: this.listToOptions(cities)
            }
        });
    }

    public render() {
        const { initialValues } = this.props;
        const { agencyFormContext, agencyLevelOptions, allowLoad } = this.state;

        if (!allowLoad) {
            return null;
        }

        return (
            <AgencyUpdateFormContext.Provider value={agencyFormContext}>
                <Formik
                    ref={this.formInstance}
                    initialValues={initialValues!}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <AgencyUpdateForm
                            agencyLevelOptions={agencyLevelOptions}
                            {...formProps}
                        />
                    )}
                </Formik>
            </AgencyUpdateFormContext.Provider>
        );
    }
}