import React, { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';

export interface Props {
  fontWeight?: FontWeight;
  fontFamily?: string;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  color?: string;
  right?: Boolean;
  center?: Boolean;
  fontSize?: Number;
}

export enum FontWeight {
  regular = fonts.FONT_FAMILY_REGULAR,
  medium = fonts.FONT_FAMILY_MEDIUM,
  bold = fonts.FONT_FAMILY_BOLD,
}

const Typography = ({
  fontWeight,
  fontFamily,
  style,
  children,
  color,
  center,
  right,
  fontSize,
}: Props) => {
  const textStyles = StyleSheet.flatten([
    // Default props text
    styles.text,
    fontWeight && { fontFamily: fontWeight },
    fontFamily && { fontFamily },
    fontSize && { fontSize },
    center && styles.center,
    right && styles.right,
    // color shortcuts
    color && { color },
    style, // rewrite predefined styles
  ]);
  // @ts-ignore
  return <Text style={textStyles}>{children}</Text>;
};

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: 14,
    color: colors.BLACK,
  },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});
export default Typography;
