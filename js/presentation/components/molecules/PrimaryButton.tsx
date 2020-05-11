import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Typography from '../atoms/Typography';
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';
import withAnalyticsButton from 'js/infraestructure/analytics/hoc/withAnalyticsButton';

interface Props {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
const PrimaryButton = ({
  style = {},
  text,
  onPress = () => {},
  disabled,
}: Props) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.button, disabled && styles.disabledButton, style]}
    onPress={onPress}>
    <Typography style={styles.text}>{text.toUpperCase()}</Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PURPLE,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    fontFamily: fonts.FONT_FAMILY,
    color: colors.WHITE,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default withAnalyticsButton()(PrimaryButton);
