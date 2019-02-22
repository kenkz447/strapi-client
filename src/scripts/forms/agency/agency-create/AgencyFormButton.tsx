import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAgency } from '@/business/agency';
import { text } from '@/i18n';
import { Agency } from '@/restful';

import { AgencyFormValues } from './agency-form-control';
import { AgencyFormControl } from './AgencyFormControl';

type AgencyFormButtonProps = ButtonProps & {
    readonly initialValues?: AgencyFormValues;
    readonly label?: string;
    readonly onSuccess?: (result: Agency) => void;
};

export class AgencyFormButton extends React.PureComponent<AgencyFormButtonProps> {
    static readonly defaultProps = {
        label: text('Create agency')
    };

    readonly productForm = React.createRef<AgencyFormControl>();

    public render() {
        const { initialValues, label, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={upsertAgency}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: Agency, { setContext }) => {
                    setContext({
                        globalModalVisibled: false,
                        globalModalProgressing: false
                    });
                    if (onSuccess) {
                        onSuccess(result);
                    }
                }}
                onFail={(errors, { setContext }) => {
                    setContext({
                        globalModalProgressing: false
                    });
                }}
            >
                {({ doBusiness, loading, context }) => {
                    const { setContext } = context;
                    return (
                        <Button
                            {...buttonProps}
                            onClick={() => setContext({
                                globalModalVisibled: true,
                                globalModal: {
                                    title: AgencyFormButton.defaultProps.label,
                                    children: (
                                        <AgencyFormControl
                                            ref={this.productForm}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { formInstance } = this.productForm.current!;
                                        await formInstance.current!.handleSubmit(undefined);
                                    }
                                }
                            })}
                        >
                            {label}
                        </Button >
                    );
                }}
            </BusinessController>
        );
    }
}