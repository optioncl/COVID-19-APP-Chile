import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../constants/colors';
import VStack from '../../molecules/VStack/VStack';
import { Alignment } from '../Stack';

interface Props {
  progress: string;
}

const ProgressBar = ({ progress = '0%' }: Props) => {
  return (
    <VStack style={styles.container} horizontalAlignItems={Alignment.center}>
      <View style={styles.bar} />
      <View style={[styles.progressBar, { width: progress }]} />
    </VStack>
  );
};

const heightBar = 4;
const styles = StyleSheet.create({
  container: {
    width: 268,
  },
  bar: {
    width: 268,
    height: heightBar,
    backgroundColor: colors.PURPLE,
    opacity: 0.24,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: heightBar,
    backgroundColor: colors.PURPLE,
  },
});

export default ProgressBar;
