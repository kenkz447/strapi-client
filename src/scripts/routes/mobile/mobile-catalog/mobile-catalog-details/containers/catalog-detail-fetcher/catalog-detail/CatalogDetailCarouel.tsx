import './CatalogDetailCarouel.scss';

import { Carousel, Icon } from 'antd';
import * as React from 'react';
import Lightbox from 'react-images';
import styled from 'styled-components';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { Img } from '@/components';
import { UploadedFile } from '@/restful';

const CatalogDetailCarouelWrapper = styled.div`
    .catalog-detail-slide {
        cursor: pointer;
    }
    
    .slick-arrow {
        font-size: 18px!important;
        line-height: 18px!important;
        background: transparent!important;
        color: gray!important;
        z-index: 99;
        ::before {
            content: ''!important;
        }
        &.slick-prev {
            left: -14px!important;
        }
        &.slick-next {
            right: -20px!important;
        }
        &.slick-disabled {
            opacity: 0.3;
        }
    }
`;

interface CatalogDetailCarouelProps {
    readonly photos: UploadedFile[];
}

interface CatalogDetailCarouelState {
    readonly lightboxIsOpen: boolean;
    readonly currentImage?: number;
    readonly photos: { readonly src: string }[];
}

export class CatalogDetailCarouel extends React.PureComponent<CatalogDetailCarouelProps, CatalogDetailCarouelState> {
    constructor(props: CatalogDetailCarouelProps) {
        super(props);

        this.state = {
            lightboxIsOpen: false,
            photos: props.photos.map(o => ({ src: getUploadedFileSrc({ uploadedFile: o }) }))
        };
    }

    private readonly openLightbox = (index: number) => {
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    private readonly renderArrow = (icon) => {
        return (
            <div>
                <Icon type={icon} />
            </div>
        );
    }

    public render() {
        const { photos } = this.props;

        return (
            <CatalogDetailCarouelWrapper>
                <Carousel
                    slidesToShow={4}
                    dots={false}
                    infinite={false}
                >
                    {
                        photos.map((photo, index) => {
                            return (
                                <div
                                    key={photo.id}
                                    className="catalog-detail-slide"
                                    onClick={() => this.openLightbox(index)}
                                >
                                    <Img file={photo} className="mw-100" />
                                </div>
                            );
                        })
                    }
                </Carousel>
                <Lightbox
                    images={this.state.photos}
                    isOpen={this.state.lightboxIsOpen}
                    currentImage={this.state.currentImage}
                    onClickPrev={(index) => {
                        this.setState({
                            currentImage: this.state.currentImage! - 1
                        });
                    }}
                    onClickNext={(index) => {
                        this.setState({
                            currentImage: this.state.currentImage! + 1
                        });
                    }}
                    onClose={() => this.setState({
                        lightboxIsOpen: false
                    })}
                />
            </CatalogDetailCarouelWrapper>
        );
    }
}
