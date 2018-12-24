import './EditableInput.scss';

import { Icon, Input, message } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';

import { text } from '@/i18n';

export interface EditableInputProps {
    readonly defaultValue: string;
    // tslint:disable-next-line:no-any
    readonly onResult: (value: string) => Promise<any> | undefined;
    readonly onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;

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

interface EditableInputState {
    readonly focused: boolean;
    readonly currentInputValue: string;
    readonly loading: boolean;
}

export class EditableInput extends React.PureComponent<EditableInputProps, EditableInputState> {
    static readonly defaultProps = {
        resultOnBlur: true
    };

    readonly ref = React.createRef<Input>();

    readonly state: EditableInputState = {
        focused: false,
        currentInputValue: this.props.defaultValue,
        loading: false
    };

    readonly onInputValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentInputValue: e.target.value
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
                currentInputValue: ''
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
            <Input
                ref={this.ref}
                autoFocus={autoFocus}
                disabled={disabled}
                suffix={loading && <Icon type="loading" spin={true} />}
                value={currentInputValue}
                className={classNames('editable-input', { 'no-border': !showBorder })}
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
        );
    }
}