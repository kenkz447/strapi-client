import './EditableInputNumber.scss';

import { Icon, Input, InputNumber, message } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';

import { text } from '@/i18n';

export interface EditableInputNumberProps {
    readonly defaultValue: number;
    // tslint:disable-next-line:no-any
    readonly onResult: (value: number) => Promise<any> | undefined;
    readonly onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>, value: number) => void;

    readonly onEditDone?: (data: {}) => void;
    readonly doneMessage?: string;
    readonly clearAfterDone?: boolean;

    readonly placeholder?: string;
    readonly allowEmpty?: boolean;
    readonly showBorder?: boolean;
    readonly autoFocus?: boolean;
    readonly resultOnBlur?: boolean;

    readonly disabled?: boolean;
}

interface EditableInputNumberState {
    readonly focused: boolean;
    readonly currentInputValue: number;
    readonly loading: boolean;
}

export class EditableInputNumber extends React.PureComponent<EditableInputNumberProps, EditableInputNumberState> {
    static readonly defaultProps = {
        resultOnBlur: true
    };

    readonly ref = React.createRef<InputNumber>();

    readonly state: EditableInputNumberState = {
        focused: false,
        currentInputValue: this.props.defaultValue,
        loading: false
    };

    readonly onInputValueChanged = (value: number) => {
        this.setState({
            currentInputValue: value
        });
    }

    readonly onResult = async () => {
        const {
            onResult,
            defaultValue,
            allowEmpty,
            onEditDone,
            doneMessage,
            clearAfterDone
        } = this.props;
        const { currentInputValue } = this.state;

        if (allowEmpty === false && !currentInputValue) {
            const warnText = text('Empty value not allowed!');
            void message.warning(warnText);
            this.setState({
                currentInputValue: defaultValue
            });

            return;
        }

        this.setState({
            loading: true
        });

        const onChangeResult = await onResult(currentInputValue);

        if (doneMessage) {
            const successText = text(doneMessage);
            message.success(successText);
        }

        this.setState({
            loading: false
        });

        if (onEditDone) {
            onEditDone(onChangeResult);
        }

        if (clearAfterDone) {
            this.setState({
                currentInputValue: 0
            });
        }
    }

    public render() {
        const {
            placeholder,
            showBorder,
            autoFocus,
            resultOnBlur,
            disabled,
            onKeyPress
        } = this.props;
        const { currentInputValue, loading } = this.state;

        return (
            <div className="editable-input-number-wrapper">
                <InputNumber
                    ref={this.ref}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    value={currentInputValue}
                    className={classNames('editable-input-number', { 'no-border': !showBorder })}
                    placeholder={placeholder}
                    onKeyPress={(e) => {
                        if (onKeyPress) {
                            onKeyPress(e, currentInputValue);
                        }

                        if (e.key !== 'Enter') {
                            return;
                        }

                        this.onResult();
                    }}
                    onChange={this.onInputValueChanged}
                    onBlur={() => {
                        if (!resultOnBlur) {
                            return;
                        }
                        this.onResult();
                    }}
                />
                {loading && <Icon type="loading" spin={true} />}
            </div>
        );
    }
}