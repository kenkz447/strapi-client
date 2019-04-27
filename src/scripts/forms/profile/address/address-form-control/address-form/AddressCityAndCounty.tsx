import { Col, Row } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { FormikActions } from 'formik';
import * as React from 'react';

import { FormSelect } from '@/components';
import { text } from '@/i18n';
import { City, County } from '@/restful';

import { AddressFormValues } from '../AddressForm';
import {
    AddressFormContext,
    AddressFormContextProps
} from '../AddressFormContext';

export interface AgencyUpdateCityAndCountyProps {
    readonly setFieldValue?: FormikActions<AddressFormValues>['setFieldValue'];
    readonly city?: City;
    readonly county?: County;
    readonly cityError?: string;
    readonly countyError?: string;
}

interface AgencyUpdateCityAndCountyState {
    readonly countyOptions: OptionProps[];
}

export class AgencyUpdateCityAndCounty extends React.PureComponent<
    AgencyUpdateCityAndCountyProps,
    AgencyUpdateCityAndCountyState
    > {

    static readonly contextType = AddressFormContext;
    readonly context!: AddressFormContextProps;

    constructor(props: AgencyUpdateCityAndCountyProps, context: AddressFormContextProps) {
        super(props);

        const { cities } = context;
        const currentCity = cities.find(o => props.city ? o.id === props.city.id : false);

        this.state = {
            countyOptions: currentCity
                ? currentCity.counties.map(o => ({ value: o.id, title: o.name }))
                : []
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

    public componentDidUpdate(prevProps: AgencyUpdateCityAndCountyProps) {
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
            <Row gutter={15}>
                <Col span={12}>
                    <FormSelect
                        name={nameof.full<AddressFormValues>(o => o.city!.id)}
                        value={city && city.id}
                        setFieldValue={setFieldValue}
                        options={cityOptions}
                        help={cityError}
                        validateStatus={cityError ? 'error' : undefined}
                        label={text('City')}
                        placeholder={text('select city')}
                        required={true}
                        showSearch={true}
                    />
                </Col>
                <Col span={12}>
                    <FormSelect
                        name={nameof.full<AddressFormValues>(o => o.county!.id)}
                        value={county && county.id}
                        setFieldValue={setFieldValue}
                        options={countyOptions}
                        help={countyError}
                        validateStatus={countyError ? 'error' : undefined}
                        label={text('County')}
                        placeholder={text('select county')}
                        required={true}
                    />
                </Col>
            </Row>
        );
    }
}
