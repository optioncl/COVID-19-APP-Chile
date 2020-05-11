import React, { useContext, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import PrimaryButton from '../../molecules/PrimaryButton';
import fonts from 'js/presentation/constants/fonts';
import { useNavigation } from '@react-navigation/native';
import routes from '../../../navigation/routes';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';
import Firebasesystem from '../../../../infraestructure/filesystem/firebasesystem';

const LungAndPlants = () => (
  <Image
    style={styles.image}
    source={require('../../../../../assets/images/lung-and-plants.png')}
  />
);

const DisclaimerMessage = () => {
  return (
    <View style={{ flexDirection: 'row', width: '80%' }}>
      <Image
        style={{ marginRight: 14, width: 20, height: 20 }}
        source={require('../../../../../assets/icons/info-icon.png')}
      />
      <Text
        style={{
          fontFamily: fonts.FONT_FAMILY,
          fontSize: 14,
          fontWeight: 'normal',
          lineHeight: 24,
          marginRight: 39,
          letterSpacing: 0.5,
        }}>
        Este test no reemplaza la evaluación de un Médico ni de un test físico.
      </Text>
    </View>
  );
};

const EvaluationReadyScreen = () => {
  const navigation = useNavigation();
  const context = useContext(TestFormContext);

  Firebasesystem.addTestResult(context.diagnosticBuilder.toTestResult());

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={styles.principalMessage}>¡Tu evaluación está lista!</Text>
      <LungAndPlants />
      <DisclaimerMessage />
      <View>
        <PrimaryButton
          text={'VER RESULTADOS'}
          onPress={() => {
            const diagnostic = context.diagnosticBuilder.toDiagnose();

            navigation.navigate(routes.RESULTS, {
              type: diagnostic,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    resizeMode: 'contain',
  },
  principalMessage: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default EvaluationReadyScreen;
