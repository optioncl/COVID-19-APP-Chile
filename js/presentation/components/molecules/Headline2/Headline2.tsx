import React from 'react';
import Typography, { Props } from '../../atoms/Typography/Typography';
import { StyleSheet } from 'react-native';
import fonts from 'js/presentation/constants/fonts';

const Headline2 = (props: Props) => {
  return (
    <Typography
      {...props}
      fontFamily={fonts.FONT_FAMILY}
      fontSize={24}
      color={'rgba(0, 0, 0, 0.87)'}
      style={styles.title}>
      {props.children}
    </Typography>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: 0.5,
  },
});

export default Headline2;
