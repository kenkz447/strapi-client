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