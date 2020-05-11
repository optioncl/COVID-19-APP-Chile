import React, {useContext, useEffect} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Components
import VStack from '../../molecules/VStack/VStack';
import StepByStep from '../../organisms/StepByStep/StepByStep';

// Screens
import ConditionsStep from './ConditionsStep';
import QuestionsStep from './QuestionsStep';
import TestsQuestionsScreen from './TestQuestionsStep';

// Constants
import colors from '../../../constants/colors';
import BreathStep from './BreathStep';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';

const FormTestScreen = () => {
  const context = useContext(TestFormContext);
  //  reset builder...
  useEffect(() => {
    context.diagnosticBuilder.reset();
  });

  return (
    <SafeAreaView style={styles.container}>
      <VStack fullSize>
        <StepByStep
          activeStepIndex={0}
          steps={[
            ConditionsStep,
            QuestionsStep,
            BreathStep,
            TestsQuestionsScreen,
          ]}
        />
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FormTestScreen;
