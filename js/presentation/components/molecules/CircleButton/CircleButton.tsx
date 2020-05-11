import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

// Components
import Typography from '../../atoms/Typography';

// Constants
import colors from 'js/presentation/constants/colors';
import fonts from 'js/presentation/constants/fonts';
import withAnalyticsButton from 'js/infraestructure/analytics/hoc/withAnalyticsButton';

interface Props {
  text?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  altColor?: boolean;
}

const CircleButton = (props: Props) => {
  const { text, disabled, onPress = () => {}, altColor } = props;

  const [fadeContainer] = useState(new Animated.Value(0));

  const customStyle = altColor
    ? [styles.button, { backgroundColor: colors.LIGHT_BLUE }]
    : [styles.button, { backgroundColor: colors.PURPLE }];

  useEffect(() => {
    Animated.timing(fadeContainer, {
      toValue: 1,
      duration: 300,
    }).start();
  }, [fadeContainer]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeContainer }]}
      onTouchStart={!altColor ? onPress : undefined}>
      <TouchableOpacity disabled={disabled} style={customStyle}>
        <Typography style={styles.text}>{text}</Typography>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  button: {
    borderRadius: 100,
    maxHeight: 170,
    width: 170,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
    flex: 1,
  },
  text: {
    fontFamily: fonts.FONT_FAMILY,
    color: colors.WHITE,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// @ts-ignore
export default withAnalyticsButton()(CircleButton);
