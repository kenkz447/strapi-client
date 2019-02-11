import { Button, Input, InputNumber, Select } from 'antd';
import { OptionProps, SelectValue } from 'antd/lib/select';
import * as React from 'react';
import styled from 'styled-components';

const InputSelectWrapper = styled.div`
    > :first-child {
        display: inline-block;
        vertical-align: baseline;
        margin-right: 5px;
    }
    .ant-select {
        width: 80px;
    }
`;

const buttonStyle = {
    display: 'inline-block',
    verticalAlign: 'bottom'
};

export interface InputSelectProps<I, S> {
    readonly defaultInputValue: I;
    readonly defaultSelectValue: S;
    readonly submiting?: boolean;
    readonly selectOptions: OptionProps[];
    readonly onSubmit: (inputValue: I, selectValue: S) => void;
    readonly submitOnChange?: boolean;
    readonly inputClassName?: string;
    readonly selectClassName?: string;
}

interface InputSelectState<I, S> {
    readonly inputValue: I;
    readonly selectValue: S;
}

export class InputSelect<I extends number | string, S extends number | string> extends React.PureComponent<
    InputSelectProps<I, S>,
    InputSelectState<I, S>
    > {
    constructor(props: InputSelectProps<I, S>) {
        super(props);
        const { defaultInputValue, defaultSelectValue } = props;
        this.state = {
            inputValue: defaultInputValue,
            selectValue: defaultSelectValue
        };
    }

    componentDidUpdate(prevProps: InputSelectProps<I, S>) {
        const {
            defaultInputValue,
            defaultSelectValue,
            submitOnChange,
            onSubmit
        } = this.props;

        if (submitOnChange) {
            if (
                defaultInputValue !== this.state.inputValue ||
                defaultSelectValue !== this.state.selectValue
            ) {
                onSubmit(this.state.inputValue, this.state.selectValue);
            }

            return;
        }

        if (
            prevProps.defaultInputValue !== this.props.defaultInputValue ||
            prevProps.defaultSelectValue !== this.props.defaultSelectValue
        ) {
            this.setState({
                inputValue: defaultInputValue,
                selectValue: defaultSelectValue
            });
        }
    }

    readonly canSubmit = () => {
        const { defaultInputValue, defaultSelectValue } = this.props;
        const { selectValue: discountUnitId, inputValue: value } = this.state;
        return (
            defaultInputValue !== value ||
            defaultSelectValue !== discountUnitId
        );
    }

    readonly submit = () => {
        const canSubmit = this.canSubmit();
        if (!canSubmit) {
            return;
        }
        const { onSubmit } = this.props;
        const { selectValue: commissionUnitId, inputValue: value } = this.state;
        onSubmit(value, commissionUnitId);
    }

    private readonly onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return;
        }

        this.submit();
    }

    public render() {
        const {
            selectOptions,
            submiting,
            submitOnChange,
            inputClassName,
            selectClassName
        } = this.props;
        const { selectValue: discountUnitId, inputValue: value } = this.state;
        return (
            <InputSelectWrapper>
                <div className={submitOnChange ? 'w-100' : ''}>
                    <Input.Group compact={true}>
                        <InputNumber
                            placeholder="..."
                            className={inputClassName}
                            value={value as number}
                            onChange={(nextValue) => this.setState({ inputValue: nextValue as I})}
                            onKeyDown={this.onInputKeyDown}
                        />
                        <Select
                            placeholder="chọn"
                            className={selectClassName}
                            value={discountUnitId as SelectValue}
                            onChange={(selectedId) => this.setState({ selectValue: selectedId as S })}
                        >
                            {
                                selectOptions.map(o =>
                                    <Select.Option key={String(o.value)} value={o.value}>{o.title}</Select.Option>
                                )
                            }
                        </Select>
                    </Input.Group>
                </div>
                {
                    !submitOnChange && (
                        <Button
                            style={buttonStyle}
                            icon="check"
                            type="primary"
                            ghost={true}
                            loading={submiting}
                            disabled={!this.canSubmit()}
                            onClick={this.submit}
                        />
                    )
                }
            </InputSelectWrapper>
        );
    }
}
