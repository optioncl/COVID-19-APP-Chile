import React, { useContext } from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import VStack from 'js/presentation/components/molecules/VStack';
import { Alignment } from 'js/presentation/components/atoms/Stack';
import PrimaryButton from '../../molecules/PrimaryButton';
import GhostButton from '../../molecules/GhostButton';
import { useNavigation } from '@react-navigation/native';
import fonts from 'js/presentation/constants/fonts';
import routes from '../../../navigation/routes';
import LinkButton from '../../molecules/LinkButton';
import eventTypes from 'js/infraestructure/analytics/event/eventTypes';
import HStack from '../../molecules/HStack/HStack';
import phones from 'js/domain/Phones';
import makeCall from 'js/infraestructure/Call';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';

const description = 'Comencemos con una breve autoevaluación';

const placeIcon = require('../../../../../assets/icons/place.png');
const phoneIcon = require('../../../../../assets/icons/phone.png');

const Description = ({ text }) => (
  <Text style={styles.description}>{text}</Text>
);

const DoctorAndForm = () => (
  <Image
    style={styles.image}
    source={require('../../../../../assets/images/doctor-and-form.png')}
  />
);

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const context = useContext(TestFormContext);
  //  reset builder...
  context.diagnosticBuilder.reset();
  return (
    <VStack
      style={styles.container}
      fullSize
      horizontalAlignItems={Alignment.center}>
      <Description text={description} />
      <DoctorAndForm />
      <PrimaryButton
        text={'Comenzar Test'}
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate(routes.FORM_TEST);
        }}
        analytics={{ pipe: eventTypes.pipeType.coronavirus }}
      />
      <VStack horizontalAlignItems={Alignment.center}>
        <GhostButton
          style={{ marginTop: 24, width: 224 }}
          icon={placeIcon}
          text={'Centros Médicos'}
          analytics={{ pipe: eventTypes.pipeType.map }}
          onPress={() => {
            navigation.navigate(routes.HEALTHCARESERVICE);
          }}
        />
        <GhostButton
          style={{ marginTop: 12, width: 224 }}
          icon={phoneIcon}
          text={'Salud  Responde'}
          onPress={() => makeCall(phones.HEALTH_ANSWER_PHONE)}
          analytics={{ pipe: eventTypes.pipeType.phone }}
        />
      </VStack>

      <HStack>
        <LinkButton
          style={{ marginTop: 12 }}
          text={'Créditos'}
          onPress={() => {
            navigation.navigate(routes.CREDITS);
          }}
          analytics={{ pipe: eventTypes.pipeType.credits }}
        />

        <LinkButton
          style={{ marginTop: 12 }}
          text={'Disclaimer'}
          onPress={() => {
            navigation.navigate(routes.DISCLAIMER);
          }}
          analytics={{ pipe: eventTypes.pipeType.disclaimer }}
        />
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  image: {
    height: 150,
    resizeMode: 'contain',
    marginTop: 28,
  },
  description: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 18,
    color: 'rgba(52, 52, 52, 0.8)',
    marginTop: 12,
    width: 150,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
