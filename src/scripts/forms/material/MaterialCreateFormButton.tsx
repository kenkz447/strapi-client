import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import * as React from 'react';

import { BusinessController } from '@/business';
import { createExternalMaterial } from '@/business/furniture-material';
import { text } from '@/i18n';
import { FurnitureMaterial } from '@/restful';

import { MaterialCreateFormValues } from './material-create-form-control';
import { MaterialCreateFormControl } from './MaterialCreateFormControl';

type MaterialCreateFormButtonProps = ButtonProps & {
    readonly initialValues?: MaterialCreateFormValues;
    readonly label?: string;
    readonly onSuccess?: (material: FurnitureMaterial) => void;
};

export class MaterialCreateFormButton extends React.PureComponent<MaterialCreateFormButtonProps> {
    static readonly defaultProps = {
        label: text('Upload material'),
        type: 'primary'
    };

    readonly form = React.createRef<MaterialCreateFormControl>();

    public render() {
        const { initialValues, label, onSuccess, ...buttonProps } = this.props;

        return (
            <BusinessController
                action={createExternalMaterial}
                onActionBegin={(param, { setContext }) => {
                    setContext({
                        globalModalProgressing: true
                    });
                }}
                onSuccess={(result: FurnitureMaterial, { setContext }) => {
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
                                    title: label,
                                    width: 600,
                                    children: (
                                        <MaterialCreateFormControl
                                            ref={this.form}
                                            initialValues={initialValues}
                                            submit={(formValue) => doBusiness(formValue)}
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