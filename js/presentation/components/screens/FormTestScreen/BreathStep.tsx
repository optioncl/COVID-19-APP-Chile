import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createCovidParams } from 'js/infraestructure/analytics/event/eventCreators';

// Components
import VStack from '../../molecules/VStack/VStack';
import { Alignment } from '../../atoms/Stack';
import Body1 from '../../molecules/Body1';
import { StepProps } from '../../organisms/StepByStep/StepByStep';
import PrimaryButton from '../../molecules/PrimaryButton';
import BreathAnimation from '../../molecules/BreathAnimation/BreathAnimation';
import CircleButton from '../../molecules/CircleButton';
// @ts-ignore
import KeepAwake from 'react-native-keep-awake';
// Constants
import colors from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import HStack from '../../molecules/HStack/HStack';

const BreathStep = (props: StepProps) => {
  const duration = 60;

  const cleanState = () => {
    setShowBreath(false);
    setIsFinishAnimation(false);
    setCircleButtonText('COMENZAR');
    setIsDisabledNextButton(true);
  };
  const [showBreath, setShowBreath] = useState(false);
  const [isFinishAnimation, setIsFinishAnimation] = useState(false);
  const [circleButtonText, setCircleButtonText] = useState('COMENZAR');
  const [isDisabledNextButton, setIsDisabledNextButton] = useState(true);

  const methods = {
    startAnimation: () => {
      setShowBreath(true);
    },
    onFinalizeAnimation: () => {
      setIsDisabledNextButton(false);
      setIsFinishAnimation(true);
      setShowBreath(false);
      setCircleButtonText('¡BIEN HECHO!');
    },
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <VStack
        fullSize
        horizontalAlignItems={Alignment.center}
        style={styles.container}>
        <VStack style={styles.content}>
          <VStack>
            <Body1>
              Ahora te ayudaremos a evaluar tu respiración. Ponte cómodo y
              relajado.
            </Body1>

            <Body1 style={styles.text}>
              Durante {duration} segundos, cuenta la cantidad de veces que tomas
              aire (tomar y botar aire se cuenta como uno).
            </Body1>

            <Body1 style={styles.textPurple}>
              Al presionar “Comenzar” se iniciará un contador de tiempo.
            </Body1>
          </VStack>

          <VStack
            horizontalAlignItems={Alignment.center}
            style={{ height: 270 }}>
            {!showBreath ? (
              <CircleButton
                altColor={isFinishAnimation}
                text={circleButtonText}
                onPress={methods.startAnimation}
                disabled={!isDisabledNextButton}
                analytics={createCovidParams({ screen: 'BreathStep' })}
              />
            ) : (
              <BreathAnimation
                duration={duration}
                onFinish={methods.onFinalizeAnimation}
              />
            )}
          </VStack>

          <HStack
            horizontalAlignItems={Alignment.center}
            style={{ margin: 10, height: 70 }}>
            <VStack style={{ marginRight: 10 }}>
              <PrimaryButton
                style={styles.nextButton}
                text={'Repetir Test'}
                onPress={cleanState}
                disabled={isDisabledNextButton}
              />
            </VStack>
            <VStack>
              <PrimaryButton
                style={styles.nextButton}
                text={'Siguiente'}
                onPress={props.next}
                disabled={isDisabledNextButton}
                analytics={createCovidParams({ screen: 'BreathStep' })}
              />
            </VStack>
          </HStack>
          <KeepAwake />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  content: {
    width: 300,
  },
  containerScroll: {
    paddingTop: 8,
  },
  nextButton: {
    width: 150,
    marginVertical: 10,
  },
  text: {
    marginTop: 16,
  },
  textPurple: {
    width: 230,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 16,
    color: colors.PURPLE,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BreathStep;
