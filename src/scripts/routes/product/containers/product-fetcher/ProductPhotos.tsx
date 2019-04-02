import * as React from 'react';
import Gallery from 'react-grid-gallery';
import styled from 'styled-components';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import {
    FurnitureComponentGroup,
    ProductExtended,
    UploadedFile
} from '@/restful';

const ProductPhotosWrapper = styled.div`
    width: 100%;
    margin-bottom: 12px;
    text-align: center;
    height: 54px;
    #ReactGridGallery {
        opacity: 0;
    }
    .ReactGridGallery_tile-viewport {
        border-radius: 6px;
        overflow: hidden;
    }
`;

interface ProductPhotosProps {
    readonly product: ProductExtended;
    readonly alwayVisibled?: boolean;
}

export class ProductPhotos extends React.PureComponent<ProductPhotosProps> {

    private readonly getPhotos = () => {
        const { product } = this.props;

        const componentGroup = product.modules[0].component.componentGroup as FurnitureComponentGroup;
        if (componentGroup && componentGroup.photos.length) {
            return componentGroup.photos;
        }

        return product.design.photos;
    }

    private readonly photosToGaleryImage = (photos: UploadedFile[]) => {
        return photos.map(o => ({
            src: getUploadedFileSrc({ uploadedFile: o }),
            thumbnail: getUploadedFileSrc({ uploadedFile: o, size: 'img256x256' }),
            thumbnailHeight: 50,
        }));
    }

    public componentDidMount() {
        setTimeout(
            () => {
                const ReactGridGallery = document.getElementById('ReactGridGallery');

                if (ReactGridGallery) {
                    ReactGridGallery.style.display = 'inline-block';
                    ReactGridGallery.style.opacity = '1';
                }
            },
            100
        );
    }

    public render() {
        const { alwayVisibled } = this.props;

        const productPhotos = this.getPhotos();
        const images = this.photosToGaleryImage(productPhotos);

        if (!alwayVisibled && !images.length) {
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