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

export type ImgSize = 'img256x256' | 'img512x512' | 'img1024x1024';