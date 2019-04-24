import * as React from 'react';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';

import { GMAP_KEY } from '@/configs';

const ContactGoogleMapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={5}
            defaultCenter={{ lat: 10.9065487, lng: 106.6780609 }}
        >
            <Marker position={{ lat: 10.9065487, lng: 106.6780609 }} />}
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