import React from 'react';
import { Image } from 'react-native';

const logo = require('../../../../assets/images/logos.png');

const FromOptionWithLove = () => <Image resizeMode={'contain'} style={{ width: 300}} source={logo} />;

export default FromOptionWithLove;
