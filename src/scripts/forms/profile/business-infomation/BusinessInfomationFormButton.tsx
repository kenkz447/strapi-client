import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { updateBusinessInfo } from '@/business/profile';
import { text } from '@/i18n';
import { User } from '@/restful';

import {
    BusinessInfomationFormValues
} from './business-infomation-form-control';
import { BusinessInfomationFormControl } from './BusinessInfomationFormControl';

type BusinessInfomationFormButtonProps = ButtonProps & {
    readonly className?: string;
    readonly initialValues?: BusinessInfomationFormValues;
    readonly onSuccess?: (user: User) => void;
    readonly formTitle: string;
};

export class BusinessInfomationFormButton extends React.PureComponent<BusinessInfomationFormButtonProps> {
    static readonly defaultProps = {
        type: 'primary'
    };

    readonly form = React.createRef<BusinessInfomationFormControl>();

    public render() {
        const { initialValues, onSuccess, formTitle, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={updateBusinessInfo}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: User, { setContext }) => {
                    if (onSuccess) {
                        onSuccess(result);
                    }

                    setContext({
                        globalModalVisibled: false,
                        globalModalProgressing: false
                    });
                }}
                onFail={(errors, { setContext }) => {
                    setContext({
                        globalModalProgressing: false
                    });
                }}
            >
                {({ doBusiness, context }) => {
                    const { setContext } = context;
                    return (
                        <Button
                            {...buttonProps}
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    closable: false,
                                    title: formTitle,
                                    width: 450,
                                    children: (
                                        <BusinessInfomationFormControl
                                            ref={this.form}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                            hideSubmitBtn={true}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { formInstance } = this.form.current!;
                                        formInstance.current!.handleSubmit(undefined);
                                    }
                                }
                            })}
                        />
                    );
                }}
            </BusinessController>
        );
    }
}