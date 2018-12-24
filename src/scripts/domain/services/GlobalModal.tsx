import './GlobalModal.scss';

import { Modal } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { WithGlobalModal } from '../base';

const GlobalModal = (props: WithContextProps<WithGlobalModal>) => {
    const {
        globalModal,
        globalModalProgressing,
        globalModalVisibled,
        setContext
    } = props;

    if (!globalModal) {
        return null;
    }

    return (
        <Modal
            {...globalModal}
            okButtonProps={{
                ...(globalModal.okButtonProps || {}),
                icon: globalModalProgressing ? 'loading' : undefined
            }}
            destroyOnClose={true}
            visible={globalModalVisibled}
            onCancel={async (e) => {
                if (globalModal.onCancel) {
                    await globalModal.onCancel(e);
                }
                setContext({
                    globalModalVisibled: false
                });
            }}
            onOk={async (e) => {
                if (globalModal.onOk) {
                    await globalModal.onOk(e);
                }
            }}
        />
    );
};

export default withContext<WithGlobalModal>(
    'globalModal',
    'globalModalProgressing',
    'globalModalVisibled'
)(GlobalModal);