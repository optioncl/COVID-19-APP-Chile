import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import Stack, { Distribution } from '../atoms/Stack';
import VStack from './VStack';

interface Props {
  text: string;
  children: ReactNode | ReactNode[];
  distribution?: Distribution;
}

const Question = ({
  distribution = Distribution.horizontal,
  text,
  children,
}: Props) => (
  <VStack style={styles.container}>
    <Text style={styles.text}>{text}</Text>
    <Stack distribution={distribution} fullSize style={styles.questions}>
      {children}
    </Stack>
  </VStack>
);

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginTop: 24,
  },
  questions: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
  text: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
  },
});

export default Question;
