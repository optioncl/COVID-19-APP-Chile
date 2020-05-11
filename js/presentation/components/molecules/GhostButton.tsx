import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Typography from '../atoms/Typography';
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';
import withAnalyticsButton from 'js/infraestructure/analytics/hoc/withAnalyticsButton';
import HStack from './HStack/HStack';
import { Alignment } from '../atoms/Stack';

interface Props {
  text: string;
  onPress?: () => void;
  style?: any;
  icon: any;
}
const GhostButton = ({ text, onPress = () => {}, icon, style = {} }: Props) => (
  <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
    <HStack verticalAlignItems={Alignment.center}>
      {icon && <Image style={styles.icon} source={icon} />}
      <Typography style={styles.text}>{text.toUpperCase()}</Typography>
    </HStack>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.WHITE,
    borderRadius: 4,
    paddingHorizontal: 21,
    paddingVertical: 8,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    flexDirection: 'column',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontFamily: fonts.FONT_FAMILY,
    color: colors.PURPLE,
    fontSize: 14,
  },
});

export default withAnalyticsButton()(GhostButton);
