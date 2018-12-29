import * as React from 'react';

import { ImgSize, UploadedFile } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file?: UploadedFile | string;
    readonly size?: ImgSize;
}

export class Img extends React.Component<ImgProps> {
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;

    static readonly addHostToPath = (url: string) => {
        if (url.startsWith('/uploads')) {
            return `${FILE_HOST}${url}`;
        }

        return url;
    }

    static readonly getUrl = (uploadedFile?: UploadedFile, size?: ImgSize) => {
        if (!uploadedFile) {
            return '';
        }
        
        if (size) {
            const fileUrl = uploadedFile[size];
            if (fileUrl) {
                return Img.addHostToPath(fileUrl);
            }
        }

        if (!uploadedFile) {
            return '';
        }

        // to fix some time url start with http://localhost:1337/...
        const url = (uploadedFile.url && uploadedFile.url.startsWith('http://')) ?
            (new URL(uploadedFile.url)).pathname :
            uploadedFile.url;

        return Img.addHostToPath(url);
    }

    readonly getSrc = () => {
        const { file, size } = this.props;

        if (!file) {
            return Img.getDefaultImgSrc();
        }

        if (typeof file === 'string') {
            if (file.startsWith('/uploads')) {
                return Img.addHostToPath(file);
            }
            return file;
        }

        return Img.getUrl(file, size);
    }

    render() {
        const imgSrc = this.getSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img {...passedProps} src={imgSrc} />;
    }
}