import React, { useRef, useState } from 'react';
import VStack from '../../molecules/VStack/VStack';
import ProgressBar from '../../atoms/ProgressBar';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Alignment } from '../../atoms/Stack';
import useAnalyticsLevel from 'js/infraestructure/analytics/hook/useAnalyticsLevel';

const SCREEN_WIDTH = Dimensions.get('window').width;

export interface StepProps {
  next: () => void;
}

export interface Props {
  activeStepIndex: number;
  steps?: Array<Element>;
}

const StepByStep = ({
  activeStepIndex: defaultActiveStepIndex = 0,
  steps = [],
}: Props) => {
  const [activeStepIndex, setActiveStepIndex] = useState(
    defaultActiveStepIndex,
  );
  const scrollView = useRef(null);

  const progress = (activeStepIndex + 1) / steps.length;

  const next = (stepIndex: number) => {
    const newActiveIndex = stepIndex + 1;
    if (newActiveIndex < steps?.length) {
      scrollView?.current?.scrollTo({
        x: newActiveIndex * SCREEN_WIDTH,
        animated: true,
      });
      setActiveStepIndex(newActiveIndex);
    }
  };

  useAnalyticsLevel({ level: progress });

  return (
    <VStack fullSize style={styles.container}>
      <VStack horizontalAlignItems={Alignment.center}>
        <ProgressBar progress={`${progress * 100}%`} />
      </VStack>

      <ScrollView
        ref={scrollView}
        style={styles.content}
        horizontal
        pagingEnabled
        scrollEnabled={false}>
        {steps.map((step, index) => (
          <VStack key={index} style={styles.step}>
            {step({ next: () => next(index) })}
          </VStack>
        ))}
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  content: {
    paddingTop: 16,
  },
  step: {
    width: SCREEN_WIDTH,
  },
  nextButton: { paddingVertical: 16, marginHorizontal: 20 },
});

export default StepByStep;
