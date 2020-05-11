import React from 'react';
// @ts-ignore
import PlacesInput from 'react-native-places-input';
import { LatLng } from 'react-native-maps';
import icons from 'js/presentation/constants/icons';

import { API_KEY_PLACE } from 'react-native-dotenv';
interface Props {
  onChange?: (location: LatLng) => void;
}

const MapSuggestionScreen = (props: Props) => {
  const { onChange } = props;
  return (
    <PlacesInput
      googleApiKey={API_KEY_PLACE}
      placeHolder="Buscar direccion"
      queryCountries={['cl']}
      iconInput={icons.SEARCH}
      language={'es-ES'}
      onSelect={(place: any) => {
        const { result } = place;

        const { geometry } = result;
        if (!geometry) {
          return;
        }

        const { location } = geometry;
        const { lat: latitude, lng: longitude } = location;

        if (onChange) {
          onChange({ latitude, longitude });
        }
      }}
    />
  );
};

export default MapSuggestionScreen;
