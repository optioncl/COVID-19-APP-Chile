import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import VStack from 'js/presentation/components/molecules/VStack';
import { Alignment } from 'js/presentation/components/atoms/Stack';
import { resultQuestionEvent } from 'js/infraestructure/analytics/event/eventCreators';
import PrimaryButton from '../../molecules/PrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import Question from '../../molecules/Question';
import { StepProps } from '../../organisms/StepByStep/StepByStep';
import Answers from '../../organisms/Answers';
import fonts from '../../../constants/fonts';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';
import Body2 from '../../molecules/Body2';
import { useNavigation } from '@react-navigation/native';
import routes from 'js/presentation/navigation/routes';

const QuestionsStep = (props: StepProps) => {
  const testFormContext = useContext(TestFormContext);
  const navigation = useNavigation();

  const [questionA, setQuestionA] = useState<number>();
  const [questionB, setQuestionB] = useState<number>();
  const [questionC, setQuestionC] = useState<number>();
  const [questionD, setQuestionD] = useState<number>();

  const isFilledQuestions = (): boolean => {
    return (
      questionA !== undefined &&
      questionB !== undefined &&
      questionC !== undefined &&
      questionD !== undefined
    );
  };

  return (
    <ScrollView style={styles.container}>
      <VStack spaceAround horizontalAlignItems={Alignment.center}>
        <Body2>Por favor responda las siguientes preguntas:</Body2>

        <Question text="A. Tengo dolor de cabeza y/o de garganta.">
          <Answers
            value={questionA}
            onChange={newQuestion => {
              setQuestionA(newQuestion);
              testFormContext.diagnosticBuilder.headacheOrSoreThroat(newQuestion === 1);
            }}
            allowAnswers={[1, 0]}
            allowAnswersTexts={['SI', 'NO']}
          />
        </Question>

        <Question text="B. Tengo tos seca continua (sin flema) que comenzó hace poco (los episodios duran varios minutos).">
          <Answers
            value={questionB}
            onChange={newQuestion => {
              setQuestionB(newQuestion);
              testFormContext.diagnosticBuilder.dryCough(newQuestion === 1);
            }}
            allowAnswers={[1, 0]}
            allowAnswersTexts={['SI', 'NO']}
          />
        </Question>

        <Question text="C. He tenido fiebre sobre 37.8ºC en las últimas 24 horas.">
          <Answers
            value={questionC}
            onChange={newQuestion => {
              setQuestionC(newQuestion);
              testFormContext.diagnosticBuilder.fever(newQuestion === 1 ? true : false);
            }}
            allowAnswers={[1, 0]}
            allowAnswersTexts={['SI', 'NO']}
          />
        </Question>

        <Question text="D. Me falta el aire y apenas puedo decir algunas palabras.">
          <Answers
            value={questionD}
            onChange={newQuestion => {
              setQuestionD(newQuestion);
              testFormContext.diagnosticBuilder.shortBreath(newQuestion === 1);
            }}
            allowAnswers={[1, 2, 3]}
            allowAnswersTexts={['SI', 'NO', 'No sé']}
          />
        </Question>

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

              props.next();
            }
          }}
          analytics={resultQuestionEvent({
            result: [
              { number: 1, value: questionA },
              { number: 2, value: questionB },
              { number: 3, value: questionC },
              { number: 4, value: questionD },
            ],
          })}
        />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 18,
    color: 'rgba(52, 52, 52, 0.8)',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 32,
    width: 180,
    marginBottom: 16,
  },
});

export default QuestionsStep;
