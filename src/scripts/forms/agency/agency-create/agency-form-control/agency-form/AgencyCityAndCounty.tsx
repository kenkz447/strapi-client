import { OptionProps } from 'antd/lib/select';
import { FormikActions } from 'formik';
import * as React from 'react';

import { FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { City, County, Order } from '@/restful';
import { sortSelectOption } from '@/utilities';

import { AgencyFormValues } from '../AgencyForm';
import {
    AgencyFormContext,
    AgencyFormContextProps
} from '../AgencyFormContext';

export interface AgencyCityAndCountyProps<P> {
    readonly setFieldValue?: FormikActions<P>['setFieldValue'];
    readonly city?: City;
    readonly cityFieldName: string;
    readonly county?: County;
    readonly countryFieldName: string;
    readonly cityError?: string;
    readonly countyError?: string;
}

interface AgencyCityAndCountyState {
    readonly countyOptions: OptionProps[];
}

export class AgencyCityAndCounty<P = {}> extends React.PureComponent<
    AgencyCityAndCountyProps<P>,
    AgencyCityAndCountyState
    > {

    static readonly contextType = AgencyFormContext;
    readonly context!: AgencyFormContextProps;

    constructor(props: AgencyCityAndCountyProps<P>) {
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

        return cityEntity
            .counties.map(o => ({ value: o.id, title: o.name }))
            .sort(sortSelectOption);
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

    public componentDidUpdate(prevProps: AgencyCityAndCountyProps<P>) {
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
            setFieldValue,
            cityFieldName,
            countryFieldName
        } = this.props;
        const { cityOptions } = this.context;
        const { countyOptions } = this.state;
        return (
            <React.Fragment>
                <FormSelect
                    name={cityFieldName}
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
                    showSearch={true}
                    optionFilterProp="title"
                />
                <FormSelect
                    name={countryFieldName}
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
