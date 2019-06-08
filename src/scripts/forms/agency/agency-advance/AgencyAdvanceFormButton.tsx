import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAgency } from '@/business/agency';
import { text } from '@/i18n';
import { Agency } from '@/restful';

import { AgencyAdvanceFormValues } from './agency-advance-form-control';
import { AgencyAdvanceFormControl } from './AgencyAdvanceFormControl';

type AgencyAdvanceFormButtonProps = ButtonProps & {
    readonly initialValues?: AgencyAdvanceFormValues;
    readonly formTitle?: string;
    readonly onSuccess?: (result: Agency) => void;
};

export class AgencyAdvanceFormButton extends React.PureComponent<AgencyAdvanceFormButtonProps> {
    static readonly defaultProps = {
        formTitle: text('Advance agency')
    };

    readonly productForm = React.createRef<AgencyAdvanceFormControl>();

    public render() {
        const { initialValues, formTitle, onSuccess, ...buttonProps } = this.props;

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
                                    title: formTitle,
                                    children: (
                                        <AgencyAdvanceFormControl
                                            ref={this.productForm}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { formInstance } = this.productForm.current!;
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