import * as React from 'react';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';

import { GMAP_KEY } from '@/configs';

const location = {
    lat: 10.918168,
    lng: 106.674693
};

const ContactGoogleMapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={location}
        >
            <Marker position={location} />
        </GoogleMap>
    );
}));

export const ContactGoogleMap = () => {
    return (
        <ContactGoogleMapComponent
            // tslint:disable-next-line:max-line-length
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};