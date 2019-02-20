import * as yup from 'yup';

export interface UploadedFile {
    readonly id: string;
    readonly name: string;
    readonly hash: string;
    readonly ext: string;
    readonly size: number;
    readonly url: string;
    readonly provider: string;
    readonly img256x256: string;
    readonly img512x512: string;
    readonly img1024x1024: string;
}

export const pploadedFileSchema = yup.object().shape<UploadedFile>({
    id: yup.string(),
    name: yup.string(),
    hash: yup.string(),
    ext: yup.string(),
    size: yup.number(),
    url: yup.string(),
    provider: yup.string(),
    img256x256: yup.string(),
    img512x512: yup.string(),
    img1024x1024: yup.string()
});

export type ImgSize = 'img256x256' | 'img512x512' | 'img1024x1024';