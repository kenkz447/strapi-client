import * as React from 'react';
import Gallery from 'react-grid-gallery';
import styled from 'styled-components';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import {
    catalogResources,
    FurnitureComponentGroup,
    ProductExtended,
    request,
    UploadedFile
} from '@/restful';

const ProductPhotosWrapper = styled.div`
width: 100%;
    margin-bottom: 12px;
    text-align: center;
    height: 54px;
    #ReactGridGallery {
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ReactGridGallery_tile-viewport {
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid lightgray;
    }
    .ReactGridGallery_tile {
        background: transparent!important;
    }
`;

interface GaleryImage {
    readonly src: string;
    readonly thumbnail: string;
    readonly thumbnailHeight: number;
}

interface ProductPhotosProps {
    readonly product: ProductExtended;
    readonly visibled?: boolean;
}

interface ProductPhotosState {
    readonly images: GaleryImage[];
}

export class ProductPhotos extends React.PureComponent<
    ProductPhotosProps,
    ProductPhotosState
    > {

    constructor(props: ProductPhotosProps) {
        super(props);

        this.state = {
            images: []
        };

        this.fetchResources();

    }

    private readonly fetchResources = async () => {
        const { product } = this.props;

        let photos: UploadedFile[] = [];
        try {
            const catalog = await request(
                catalogResources.findOneByCode, {
                    type: 'path',
                    parameter: 'code',
                    value: product.modulesCode
                });

            photos = catalog.photos;
        } catch (error) {
            //
        }

        if (!photos.length) {
            photos = this.getPhotos();
        }

        this.setState({
            images: this.photosToGaleryImage(photos)
        });
    }

    private readonly getPhotos = () => {
        const { product } = this.props;

        const componentGroup = product.modules[0].component.componentGroup as FurnitureComponentGroup;
        if (componentGroup && componentGroup.photos.length) {
            return componentGroup.photos;
        }

        return product.design.photos;
    }

    private readonly photosToGaleryImage = (photos: UploadedFile[]) => {
        return photos.map((o): GaleryImage => ({
            src: getUploadedFileSrc({ uploadedFile: o }),
            thumbnail: getUploadedFileSrc({ uploadedFile: o, size: 'img256x256' }),
            thumbnailHeight: 50,
        }));
    }

    public componentDidUpdate(prevProps: ProductPhotosProps) {
        if (prevProps.product.modulesCode === this.props.product.modulesCode) {
            return;
        }

        this.fetchResources();
    }

    public render() {
        const { visibled } = this.props;
        const { images } = this.state;

        if (!visibled) {
            return null;
        }

        return (
            <ProductPhotosWrapper>
                <Gallery
                    images={images}
                    enableImageSelection={false}
                    rowHeight={50}
                />
            </ProductPhotosWrapper>
        );
    }
}