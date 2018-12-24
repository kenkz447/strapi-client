import { Modal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';

export type ConfirmType = ModalFuncProps['okType'];

export const confirm = (
    title: string = 'Xác nhận?',
    content: string = 'Lưu ý, hành động này không thể hoàn tác!',
    type: ConfirmType = 'danger'
) => {
    return new Promise((resolve) => {
        Modal.confirm({
            title,
            content,
            okType: type,
            onOk: () => resolve(true),
            onCancel: () => resolve(false)
        });
    });
};