import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import defaultPosition from 'js/infraestructure/const/PositionDefault';
const getLocation = (): LatLng => {
  let geopoint = defaultPosition;
  Geolocation.getCurrentPosition(
    position => {
      let {
        coords: { latitude, longitude },
      } = position;
      geopoint = { latitude, longitude };
    },
    () => {},
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );

  return geopoint;
};

export { getLocation };
