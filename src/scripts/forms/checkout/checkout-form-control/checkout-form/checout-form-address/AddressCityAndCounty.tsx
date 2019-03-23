import { Col, Form, Row } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { FormikActions } from 'formik';
import * as React from 'react';

import { FormSelect, verticalLayout } from '@/components';
import { text } from '@/i18n';
import { City, County } from '@/restful';

import { CheckoutFormValues } from '../../CheckoutForm';
import {
    CheckoutFormContext,
    CheckoutFormContextProps
} from '../../CheckoutFormContext';

export interface AddressCityAndCountyProps {
    readonly setFieldValue?: FormikActions<CheckoutFormValues>['setFieldValue'];
    readonly city?: City;
    readonly county?: County;
    readonly cityError?: string;
    readonly countyError?: string;
}

interface AddressCityAndCountyState {
    readonly countyOptions: OptionProps[];
}

export class AddressCityAndCounty extends React.PureComponent<
    AddressCityAndCountyProps,
    AddressCityAndCountyState
    > {

    static readonly contextType = CheckoutFormContext;
    readonly context!: CheckoutFormContextProps;

    constructor(props: AddressCityAndCountyProps) {
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

    private readonly setCityTransportFee = () => {
        const cityEntity = this.findCityEntity();
        if (!cityEntity) {
            return;
        }

        const { setFieldValue } = this.props;

        setFieldValue!(
            nameof.full<CheckoutFormValues>(o => o.shippingToCity!.transportFee),
            cityEntity.transportFee
        );
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

    public componentDidUpdate(prevProps: AddressCityAndCountyProps) {
        const isCityChanged = this.props.city !== prevProps.city;

        if (!isCityChanged) {
            return;
        }
        
        this.setCityTransportFee();
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
                    name={nameof.full<CheckoutFormValues>(o => o.shippingToCity!.id)}
                    value={city && city.id}
                    setFieldValue={setFieldValue}
                    options={cityOptions}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={cityError}
                    validateStatus={cityError ? 'error' : undefined}
                    label={text('Thành phố')}
                    placeholder={text('Chọn thành phố')}
                    required={true}
                />
                <FormSelect
                    name={nameof.full<CheckoutFormValues>(o => o.shippingToCounty!.id)}
                    value={county && county.id}
                    setFieldValue={setFieldValue}
                    options={countyOptions}
                    wrapperCol={verticalLayout.wrapperCol}
                    labelCol={verticalLayout.labelCol}
                    help={countyError}
                    validateStatus={countyError ? 'error' : undefined}
                    label={text('Quận huyện')}
                    placeholder={text('Chọn quận huyện')}
                    required={true}
                />
            </React.Fragment>
        );
    }
}
