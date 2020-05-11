import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from './Typography';
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';
import brand from 'js/presentation/constants/brand';
import Logo from './Logo';

const Logotype = () => (
  <View style={styles.container}>
    <Logo />
    <Typography style={styles.text}>
      {brand.PRODUCT_NAME.toUpperCase()}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    lineHeight: 45,
    letterSpacing: 2,
    fontFamily: fonts.BRAND_FAMILY,
    marginLeft: 16,
    color: colors.PURPLE,
  },
});

export default Logotype;
