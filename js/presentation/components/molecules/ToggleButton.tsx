import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Typography from '../atoms/Typography';
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';
import HStack from './HStack/HStack';
import { Alignment } from '../atoms/Stack';

interface Props {
  style?: StyleProp<ViewStyle>;
  text: string;
  active?: boolean;
  onPress?: () => void;
  icon?: any;
}
const ToggleButton = ({
  style = {},
  text,
  active = false,
  onPress = () => {},
  icon = null,
}: Props) => (
  <TouchableOpacity
    style={[active ? styles.activeButton : styles.disabledButton, style]}
    onPress={onPress}>
    <HStack verticalAlignItems={Alignment.center}>
      {icon && <Image source={icon} />}
      <Typography
        style={active ? styles.activeButtonText : styles.disabledButtonText}>
        {text.toUpperCase()}
      </Typography>
    </HStack>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: colors.PURPLE,
    borderRadius: 4,
    paddingHorizontal: 21,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeButtonText: {
    fontFamily: fonts.FONT_FAMILY,
    color: colors.WHITE,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: colors.WHITE,
    borderRadius: 4,
    paddingHorizontal: 21,
    paddingVertical: 8,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  disabledButtonText: {
    fontFamily: fonts.FONT_FAMILY,
    color: colors.PURPLE,
    fontSize: 14,
  },
});

export default ToggleButton;
