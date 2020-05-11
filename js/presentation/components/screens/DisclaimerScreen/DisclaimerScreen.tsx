import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Alignment} from "../../atoms/Stack";
import FromOptionWithLove from "../../molecules/FromOptionWithLove";

const texts = [
  'Este test:',
  'No reemplaza la evaluación de un Médico.',
  'No reemplaza la evaluación de un test físico.',
  'No permite reservar una hora en un centro de salud.',
  'No permite solicitar exámenes ni resultados.',
  'No es para verificar casos de contagios o personas contagiadas por Coronavirus.',
  'No entrega indicaciones especificas del centro asistencial que debes acudir, solo entrega información de la ubicación de los centros disponibles.',
  'Si incentiva el que permanezcas en casa, y que acudas a algún centro de salud solo si presentas una alta probabilidad de estar contagiado.'
];

const DisclaimerScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontFamily: 'Nunito',
          fontStyle: 'normal',
          letterSpacing: 0.15,
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '900',
          color: '#7263DE',
        }}>
        Disclaimer
      </Text>

      <ScrollView style={{paddingHorizontal: '15%'}}>
        {texts.map((value, index) => (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 'normal',
              letterSpacing: 0.15,
              fontSize: 14,
              lineHeight: 22,
              color: 'rgba(0,0,0,.87)',
              marginBottom: 16,
            }}>
            {value}
          </Text>
        ))}
      </ScrollView>

      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <FromOptionWithLove />
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export default DisclaimerScreen;
