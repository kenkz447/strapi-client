import { OptionProps } from 'antd/lib/select';
import { FormikActions } from 'formik';
import * as React from 'react';

import { FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { City, County, Order } from '@/restful';

import { AgencyFormValues } from '../AgencyForm';
import {
    AgencyFormContext,
    AgencyFormContextProps
} from '../AgencyFormContext';

export interface AgencyCityAndCountyProps {
    readonly setFieldValue?: FormikActions<AgencyFormValues>['setFieldValue'];
    readonly city?: City;
    readonly county?: County;
    readonly cityError?: string;
    readonly countyError?: string;
}

interface AgencyCityAndCountyState {
    readonly countyOptions: OptionProps[];
}

export class AgencyCityAndCounty extends React.PureComponent<
    AgencyCityAndCountyProps,
    AgencyCityAndCountyState
    > {

    static readonly contextType = AgencyFormContext;
    readonly context!: AgencyFormContextProps;

    constructor(props: AgencyCityAndCountyProps) {
        super(props);

        this.state = {
            countyOptions: []
        };
    }

    private readonly findCityEntity = () => {
        const { city } = this.props;

        if (!city) {
            return;
        }

        const { cities } = this.context;

        return cities.find(o => o.id === city!.id)!;
    }

    private readonly getCountyOptionFormCityEntity = () => {
        const cityEntity = this.findCityEntity();
        if (!cityEntity) {
            return [];
        }

        return cityEntity.counties.map(o => ({ value: o.id, title: o.name }));
    }

    private readonly setCountyOptions = () => {
        const { city } = this.props;

        if (!city) {
            this.setState({
                countyOptions: []
            });
        }

        this.setState({
            countyOptions: this.getCountyOptionFormCityEntity()
        });
    }

    public componentDidUpdate(prevProps: AgencyCityAndCountyProps) {
        const isCityChanged = this.props.city !== prevProps.city;

        if (!isCityChanged) {
            return;
        }
        
        this.setCountyOptions();
    }

    public componentDidMount() {
        const countyOptions = this.getCountyOptionFormCityEntity();

        if (!countyOptions || !countyOptions.length) {
            return;
        }

        this.setState({
            countyOptions: this.getCountyOptionFormCityEntity()
        });
    }

    public render() {
        const {
            cityError,
            countyError,
            city,
            county,
            setFieldValue
        } = this.props;
        const { cityOptions } = this.context;
        const { countyOptions } = this.state;
        return (
            <React.Fragment>
                <FormSelect
                    name={nameof.full<AgencyFormValues>(o => o.city!.id)}
                    value={city && city.id}
                    setFieldValue={setFieldValue}
                    options={cityOptions}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={cityError}
                    validateStatus={cityError ? 'error' : undefined}
                    label={text('City')}
                    placeholder={text('select city')}
                    required={true}
                />
                <FormSelect
                    name={nameof.full<AgencyFormValues>(o => o.county!.id)}
                    value={county && county.id}
                    setFieldValue={setFieldValue}
                    options={countyOptions}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={countyError}
                    validateStatus={countyError ? 'error' : undefined}
                    label={text('County')}
                    placeholder={text('select county')}
                    required={true}
                />
            </React.Fragment>
        );
    }
}
