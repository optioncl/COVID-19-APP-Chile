import React from 'react';
import { Image } from 'react-native';
import brand from 'js/presentation/constants/brand';

const SIZE = 16;
const Logo = () => (
  <Image
    width={SIZE}
    height={SIZE}
    style={{ width: SIZE, height: SIZE }}
    source={brand.LOGO_IMAGE}
  />
);

export default Logo;
