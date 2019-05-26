import { Icon } from 'antd';
import * as React from 'react';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';

import { GMAP_KEY } from '@/configs';

const location = {
    lat: 10.918471,
    lng: 106.674512
};

const ContactGoogleMapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={location}
            defaultOptions={{
                scrollwheel: false
            }}
        >
            <Marker position={location} />
        </GoogleMap>
    );
}));

export const ContactGoogleMap = React.memo(() => {
    return (
        <div>
            <div style={{ lineHeight: `40px` }}>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                    target="_blank"
                >
                    <Icon type="link"/> Xem chỉ đường bằng Google Map
                </a>
            </div>
            <ContactGoogleMapComponent
                // tslint:disable-next-line:max-line-length
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
});