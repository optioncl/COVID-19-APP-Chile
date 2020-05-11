import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import VStack from 'js/presentation/components/molecules/VStack';
import {
  Alignment,
  Distribution,
} from 'js/presentation/components/atoms/Stack';
import PrimaryButton from '../../molecules/PrimaryButton';
import fonts from 'js/presentation/constants/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Question from '../../molecules/Question';
import { useNavigation } from '@react-navigation/native';
import routes from '../../../navigation/routes';
import Answers from '../../organisms/Answers';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';
import { resultTestQuestionEvent } from 'js/infraestructure/analytics/event/eventCreators';

const TestsQuestionsScreen = () => {
  const navigation = useNavigation();
  const testFormContext = useContext(TestFormContext);

  const [questionA, setQuestionA] = useState<number>();
  const [questionB, setQuestionB] = useState<number>();
  const [enabledNext, setEnabledNext] = useState<boolean>(false);
  const [displayNextQuestion, setDisplayNextQuestion] = useState<boolean>(
    false,
  );

  useEffect(() => {
    setQuestionB(undefined);
    if (questionA !== undefined) {
      testFormContext.diagnosticBuilder.canDoRespiratoryTest(questionA === 1);
      const diagnostic = testFormContext.diagnosticBuilder.toDiagnose();
      setDisplayNextQuestion(questionA !== 1 && diagnostic === undefined);
    }
  }, [questionA]);

  useEffect(() => {
    if (questionB === undefined || questionB === null) {
      testFormContext.diagnosticBuilder.testProblem(undefined);
    } else {
      testFormContext.diagnosticBuilder.testProblem(questionB === 3);
    }
  }, [questionB]);

  const isFilledQuestions = (): boolean => {
    if (!displayNextQuestion && enabledNext) {
      return true;
    }
    if (questionA === 1) {
      return true;
    }
    return questionA !== undefined && questionB !== undefined;
  };

  return (
    <ScrollView style={styles.container}>
      <VStack spaceAround horizontalAlignItems={Alignment.center}>
        <Text>Por favor responda las siguientes preguntas:</Text>

        <VStack>
          <Question
            text="A. ¿Cuántas inhalaciones contaste?"
            distribution={Distribution.vertical}>
            <Answers
              value={questionA}
              onChange={newQuestion => {
                setQuestionA(newQuestion);
                setQuestionB(null);
                setEnabledNext(true);
              }}
              allowAnswers={[1, 0]}
              allowAnswersTexts={['MÁS DE 25', 'MENOS DE 25']}
            />
          </Question>

          {displayNextQuestion && (
            <Question
              distribution={Distribution.vertical}
              text="B. ¿Sientes que tu respiración ha cambiado respecto a otros días?
(Ej. ahora te cansas más rápido)">
              <Answers
                value={questionB}
                onChange={newQuestion => {
                  setQuestionB(newQuestion);
                  setEnabledNext(true);
                }}
                allowAnswers={[1, 2, 3, 4]}
                allowAnswersTexts={[
                  'SÍ, ME SIENTO MEJOR',
                  'Me siento igual',
                  'Sí, me canso más',
                  'no estoy seguro/A',
                ]}
              />
            </Question>
          )}
        </VStack>

        <PrimaryButton
          style={styles.nextButton}
          text={'Siguiente'}
          disabled={!isFilledQuestions()}
          onPress={() => {
            if (isFilledQuestions()) {
              const diagnostic = testFormContext.diagnosticBuilder.toDiagnose();
              if (diagnostic !== undefined) {
                navigation.navigate(routes.EVALUATION_READY_TEST);
              }
            }
          }}
          analytics={resultTestQuestionEvent({
            result: [
              { number: 5, value: questionA },
              { number: 6, value: questionB },
            ],
          })}
        />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  nextButton: {
    width: 180,
    marginTop: 32,
    marginBottom: 16,
  },
  description: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 18,
    color: 'rgba(52, 52, 52, 0.8)',
    textAlign: 'center',
  },
});

export default TestsQuestionsScreen;
