interface FormControlPropsBase {
    readonly beforeSubmit: () => void;
    readonly onSuccess: () => void;
    readonly onFailed: () => void;
}

export type FormControlProps<T> = T & FormControlPropsBase;