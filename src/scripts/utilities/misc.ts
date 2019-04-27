import { OptionProps } from 'antd/lib/select';

export const sortSelectOption = (option1: OptionProps, option2: OptionProps) => {
    if (option1.title! < option2.title!) {
        return -1;
    }

    if (option1.title! > option2.title!) {
        return 1;
    }

    return 0;
};

export const getNestedObjectId = (obj: undefined | string | { readonly id?: string }) => {
    if (!obj) {
        return undefined;
    }

    if (typeof obj === 'string') {
        return obj;
    }

    return obj.id;
};