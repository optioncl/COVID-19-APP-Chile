import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;
export default function(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
