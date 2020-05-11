import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../atoms/Typography';
import fonts from 'js/presentation/constants/fonts';
import withAnalyticsLink from 'js/infraestructure/analytics/hoc/withAnalyticsLink';

const LinkButton = ({ style, text, onPress }) => (
  <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
    <Typography style={styles.text}>{text}</Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 14,
    color: '#8170FC',
    textDecorationLine: 'underline',
  },
});

export default withAnalyticsLink()(LinkButton);
