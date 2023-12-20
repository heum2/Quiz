import { Dimensions, PixelRatio, Platform } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
const GUIDE_LINE_BASE_WIDTH = 375;

export const scaleSize = (size: number): number =>
  (WINDOW_WIDTH / GUIDE_LINE_BASE_WIDTH) * size;

export const scaleFont = (size: number): number => {
  const newSize = size * (WINDOW_WIDTH / GUIDE_LINE_BASE_WIDTH);

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
