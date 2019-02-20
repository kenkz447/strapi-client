import { Record, Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { pploadedFileSchema, UploadedFile } from './uploadedFile';
import { User, userSchema } from './user';

export interface BusinessLicense extends Record {
    readonly id: string;
    readonly created_by: User;
    readonly companyName: string;
    readonly businessAreas: string;
    readonly businessLicense: UploadedFile;
}

export const businessLicenseSchema = yup.object().shape<BusinessLicense>({
    id: yup.string(),
    companyName: yup.string().required(),
    businessAreas: yup.string().required(),
    created_by: userSchema.nullable(true).default(null),
    businessLicense: pploadedFileSchema.required()
});

export const businessLicenseResourceType = new ResourceType<BusinessLicense>(nameof<BusinessLicense>());

export const businessLicenseResources = {
    find: new Resource<BusinessLicense>({
        resourceType: businessLicenseResourceType,
        method: 'GET',
        url: '/businessLicenses'
    }),
    create: new Resource<BusinessLicense>({
        resourceType: businessLicenseResourceType,
        method: 'POST',
        url: '/businessLicenses',
        bodySchema: businessLicenseSchema
    })
};