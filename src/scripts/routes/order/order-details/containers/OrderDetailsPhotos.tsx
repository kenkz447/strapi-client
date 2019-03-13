import * as React from 'react';
import Gallery from 'react-grid-gallery';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { Order } from '@/restful';

interface OrderDetailsPhotosProps {
    readonly order: Order;
}

export class OrderDetailsPhotos extends React.PureComponent<OrderDetailsPhotosProps> {
    private readonly getImages = () => {
        const { order } = this.props;
        return order.photos.map(o => {
            return {
                src: getUploadedFileSrc({ uploadedFile: o }),
                thumbnail: getUploadedFileSrc({ uploadedFile: o })
            };
        });
    }

    public render() {
        const images = this.getImages();
        return (
            <Gallery
                images={images}
                enableImageSelection={false}
            />
        );
    }
}
