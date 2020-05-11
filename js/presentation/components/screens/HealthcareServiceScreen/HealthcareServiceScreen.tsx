import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import icons from 'js/presentation/constants/icons';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  defaultHealthcare,
  HealthcareService,
} from 'js/domain/HealthcareService';
import { getLocation } from 'js/infraestructure/GPSPosition';
import apiDatMob from 'js/infraestructure/api/DatMobApi';
import filesystem from 'js/infraestructure/filesystem/firebasesystem';
import Perfomance from 'js/infraestructure/api/Perfomance';
import VStack from '../../molecules/VStack';
import { Alignment } from '../../atoms/Stack';
import MapSuggestionScreen from './MapSuggestionScreen';
import HealthcareData from './HealthcareDataScreen';

const HealthcareServiceScreen = () => {
  const [healthcareService, setHealthcareService] = useState<HealthcareService>(
    defaultHealthcare,
  );
  const map = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [markers, setMarkers] = useState<Array<HealthcareService>>([]);
  const [locationsIds, setLocationsIds] = useState<
    Array<{ loc_id?: String; totalPeople: number }>
  >([{ loc_id: undefined, totalPeople: 0 }]);

  const [isVisible, setVisible] = useState(false);
  const [geopoint] = useState(getLocation);
  const [showSearchLocation, setShowSearchLocation] = useState(false);
  const [geopointOfSearchMap, setGeopointOfSearchMap] = useState(getLocation);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: geopoint.latitude,
    longitude: geopoint.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const loadHealthcares = async () => {
      setIsLoading(true);

      const healthcares = await filesystem.getHealthcare();
      setMarkers(healthcares);

      const locationsIdsMarker = healthcares
        .filter(item => item.LocationId)
        .map(item => item.LocationId)
        .filter((x, i, a) => a.indexOf(x) === i);

      const data = await apiDatMob.getAllClientPotentialPerfomance({
        'loc_id[]': locationsIdsMarker,
      });

      let dataLocationsIds: Array<{
        loc_id?: String;
        totalPeople: number;
      }> = data.map(
        (item: { loc_id: string; performance: Array<Perfomance> }) => {
          return {
            loc_id: item.loc_id,
            totalPeople: item.performance.reduce((a: number, b: Perfomance) => {
              return a + b.value;
            }, 0),
          };
        },
      );

      setLocationsIds(dataLocationsIds);

      setIsLoaded(true);
      setIsLoading(false);
    };

    if (isLoaded || isLoading) {
      return;
    }

    loadHealthcares();
  }, [isLoaded, isLoading, setIsLoading, setIsLoaded]);

  const onChange = (location: LatLng) => {
    const { latitude, longitude } = location;
    setGeopointOfSearchMap(location);
    if (!map) {
      return;
    }
    map?.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      350,
    );
    setShowSearchLocation(true);
  };

  const getNearbyMarkers = () => {
    if (markers.length === 0) {
      return [];
    }

    const nearbyMarkers = markers.filter(healthcareService => {
      const latitudeDiff =
        healthcareService.geopoint.latitude - currentRegion.latitude;
      const longitudeDiff =
        healthcareService.geopoint.longitude - currentRegion.longitude;

      const min = -0.05;
      const max = 1.05;
      return (
        latitudeDiff > min &&
        latitudeDiff < max &&
        longitudeDiff > min &&
        longitudeDiff < max
      );
    });

    return nearbyMarkers;
  };

  const renderMarker = (marker: HealthcareService) => {
    let colorMarker = icons.MAP_POINTER_DEFAULT;
    const findHealthcareOnLocations = locationsIds.find(
      item => item.loc_id === marker.LocationId,
    );

    if (findHealthcareOnLocations) {
      marker.hasPeople = true;
      marker.totalPeople = findHealthcareOnLocations.totalPeople;
      colorMarker = icons.MAP_POINTER_ORANGE;
    }

    return (
      <Marker
        key={marker.Id}
        icon={colorMarker}
        coordinate={marker.geopoint}
        tracksViewChanges={false}
        onPress={() => {
          setShowSearchLocation(false);
          setVisible(true);
          setHealthcareService(marker);
          setCurrentRegion({
            latitude: marker.geopoint.latitude,
            longitude: marker.geopoint.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={map}
          onRegionChange={setCurrentRegion}
          initialRegion={currentRegion}
          showsUserLocation
          showsMyLocationButton
          loadingEnabled>
          {getNearbyMarkers().map(renderMarker)}

          {showSearchLocation && (
            <Marker draggable coordinate={geopointOfSearchMap} />
          )}
        </MapView>

        {<MapSuggestionScreen onChange={onChange} />}

        {isLoading && (
          <VStack
            style={styles.overlayLoading}
            verticalAlignItems={Alignment.center}
            horizontalAlignItems={Alignment.center}>
            <VStack
              verticalAlignItems={Alignment.center}
              horizontalAlignItems={Alignment.center}
              style={styles.loadingContainer}>
              <ActivityIndicator />
            </VStack>
          </VStack>
        )}
      </View>
      <View>
        {isVisible && HealthcareData(healthcareService)}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlayLoading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingContainer: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HealthcareServiceScreen;
