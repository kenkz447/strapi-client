import * as yup from 'yup';

export type RoleType = 'root' | 'authenticated';

export interface Role {
    readonly id: string;
    readonly description: string;
    readonly name: string;
    readonly type: RoleType;
}

export const roleSchema = yup.object<Role>().shape({
    description: yup.string(),
    id: yup.string().required(),
    name: yup.string().required(),
    type: yup.mixed().oneOf(['root', 'authenticated'] as RoleType[])
});