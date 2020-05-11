import VStack from '../../molecules/VStack';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import icons from 'js/presentation/constants/icons';
import fonts from '../../../constants/fonts';
import HStack from '../../molecules/HStack/HStack';
import React from 'react';
import { HealthcareService } from 'js/domain/HealthcareService';
import makeCall from 'js/infraestructure/Call';
import normalize from 'js/presentation/util/font.normalize';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const textEllipsize = (style: StyleProp<TextStyle>, text: String) => (
  <Text ellipsizeMode={'tail'} numberOfLines={2} style={style}>
    {text}
  </Text>
);
const openMap = (healthcareService: HealthcareService) => {
  const { geopoint, Name } = healthcareService;
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${geopoint.latitude},${geopoint.longitude}`;
  const url = Platform.select({
    ios: `${scheme}${Name}@${latLng}`,
    android: `${scheme}${latLng}(${Name})`,
  });

  if (!url) {
    return;
  }

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url)
          .then()
          .catch();
      }
    })
    .catch();
};

const HealthcareData = (healthcareService: HealthcareService) => {
  const backgroundColor = healthcareService.hasPeople ? '#F98F1B' : '#8170FC';
  const peopleText = healthcareService.hasPeople
    ? `Aprox ${healthcareService.totalPeople} persona(s) en la última hora`
    : 'Afluencia no disponible';
  const renderIcon = (source: ImageSourcePropType, onPress = () => {}) => {
    return (
      <VStack style={styles.containerIcons}>
        <TouchableOpacity onPress={onPress}>
          <Image source={source} />
        </TouchableOpacity>
      </VStack>
    );
  };

  const renderCallHealthcare = () => {
    if (!healthcareService.Phone) {
      return null;
    }
    if (healthcareService.Phone.toString().trim().length === 0) {
      return null;
    }

    return renderIcon(icons.CALL_CIRCLE, () => {
      makeCall(healthcareService.Phone);
    });
  };

  return (
    <HStack style={styles.container}>
      <VStack spaceAround style={styles.containerData}>
        {textEllipsize(styles.textHealthcare, healthcareService.Name)}
        {textEllipsize(styles.textAddress, healthcareService.Address)}
        <View style={styles.containerRow}>
          <View>
            <TouchableHighlight style={[{ backgroundColor }, styles.circle]}>
              <Text />
            </TouchableHighlight>
          </View>
          <View style={styles.containerViewTotalPeole}>
            {textEllipsize(styles.textTotalPeople, peopleText)}
          </View>
        </View>
      </VStack>
      {renderIcon(icons.LOCATION, () => {
        openMap(healthcareService);
      })}
      {renderCallHealthcare()}
    </HStack>
  );
};

const styles = StyleSheet.create({
  containerRow: { flexDirection: 'row' },
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  containerViewTotalPeole: { marginLeft: 5 },
  containerData: { width: SCREEN_WIDTH * 0.8 },
  textHealthcare: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: normalize(14),
    color: 'rgba(52, 52, 52, 0.8)',
    fontWeight: 'bold',
  },
  textAddress: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: normalize(12),
    color: 'rgba(52, 52, 52, 0.8)',
  },
  circle: {
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    width: 12,
    height: 12,
  },
  textTotalPeople: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: normalize(12),
    color: 'rgba(52, 52, 52, 0.8)',
  },
  containerIcons: { width: SCREEN_WIDTH * 0.1 },
});

export default HealthcareData;
