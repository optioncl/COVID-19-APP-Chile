import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Stack from '../../atoms/Stack';
import colors from 'js/presentation/constants/colors';
import Typography from '../../atoms/Typography';
import icons from 'js/presentation/constants/icons';
import { FontWeight } from '../../atoms/Typography/Typography';
import HStack from '../../molecules/HStack/HStack';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '../../molecules/PrimaryButton';
import VStack from '../../molecules/VStack';
import { useSafeArea } from 'react-native-safe-area-context';
import LinkButton from '../../molecules/LinkButton';
import routes from '../../../navigation/routes';
import { resetAnalyticsData } from 'js/infraestructure/analytics/event/tagCreators';
import useAnalyticsUnlock from 'js/infraestructure/analytics/hook/useAnalyticsUnlock';

interface Props {
  type: ResultTypes;
}

export enum ResultTypes {
  green = 'green',
  red = 'red',
  yellow = 'yellow',
  orange = 'orange',
}

const advices = [
  'Lava tus manos con agua y jabón por, al menos, 20 segundos.',
  'Siempre lava tus manos al llegar a tu casa.',
  'Si saliste, quítate los zapatos y déjalos en un lugar separado, lava la ropa con la que saliste.',
  'Antes de entrar a tu casa, desinfecta las patas a tu mascota.',
  'Desinfecta tu celular con alcohol gel.',
];

// @ts-ignore
const ResultScreen = ({ route, navigation }: Props) => {
  const { type } = route.params;
  const insets = useSafeArea();
  useAnalyticsUnlock({ achievement_id: type });

  const renderRedType = () => {
    return (
      <VStack style={[styles.container, { paddingBottom: insets.bottom }]}>
        <ScrollView style={styles.content}>
          <Stack
            style={[
              styles.alertContainer,
              { backgroundColor: colors.RED, marginBottom: 28 },
            ]}>
            <Image source={icons.ALERT_ICON} />
            <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
              <Typography
                fontWeight={FontWeight.bold}
                color={colors.WHITE}
                style={styles.text15}>
                {'es probable que tengas coronavirus y requieras asistencia médica'.toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            fontWeight={FontWeight.regular}
            color={colors.BLACK}
            style={styles.textAlignCenter}>
            Por favor sigue las siguientes recomendaciones:
          </Typography>
          <Stack style={[styles.alertContainer, { marginVertical: 20 }]}>
            <Image source={icons.CALL_ICON} />
            <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
              <Typography
                fontWeight={FontWeight.bold}
                color={colors.PURPLE}
                style={styles.text15}>
                {'llama a salud responde 600 360 7777'.toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            fontWeight={FontWeight.regular}
            color={colors.BLACK}
            style={{
              fontSize: 14,
              letterSpacing: 0.15,
              marginBottom: 24,
              lineHeight: 20,
            }}>
            Comunícate de inmediato con Salud Responde y reporta tus síntomas.
          </Typography>
          <Typography
            fontWeight={FontWeight.regular}
            color={colors.BLACK}
            style={{
              fontSize: 14,
              letterSpacing: 0.15,
              marginBottom: 24,
              lineHeight: 20,
            }}>
            Si tus síntomas empeoran durante el día, solicita una ambulancia a
            tu centro asistencial más cercano o con convenio.
          </Typography>
          <HStack
            style={[
              styles.divContainer,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 20,
              },
            ]}>
            <Image source={icons.MAP_ICON} />
            <Typography
              fontWeight={FontWeight.bold}
              color={colors.BLACK}
              style={[
                styles.textWithFlex,
                {
                  flex: 1,
                  flexWrap: 'wrap',
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 20,
                  letterSpacing: 0.15,
                },
              ]}>
              Revisa el mapa para ver qué centro asistencial está menos
              congestionado.
            </Typography>
          </HStack>
          <Stack style={[styles.bottomButton, { paddingBottom: 30 }]}>
            <PrimaryButton
              text={'ver mapa'}
              onPress={() => navigation.navigate(routes.HEALTHCARESERVICE)}
            />
            <View style={{ marginTop: 24 }}>
              <LinkButton
                text={'Ir al inicio'}
                onPress={() => {
                  navigation.navigate(routes.HOME);
                  resetAnalyticsData();
                }}
              />
            </View>
          </Stack>
        </ScrollView>
      </VStack>
    );
  };

  const renderAlert = () => {
    let text = '';
    let color;
    switch (type) {
      case ResultTypes.green:
        color = colors.GREEN;
        text = 'No tienes síntomas específicos asociados al Coronavirus';
        break;
      case ResultTypes.yellow:
        color = colors.YELLOW;
        text = 'TIENES ALGUNOS síntomas asociados al Coronavirus';
        break;
      case ResultTypes.orange:
        color = colors.ORANGE;
        text = 'PRESENTAS síntomas QUE INDICAN QUE PODRÍAS TENER CORONAVIRUS';
        break;
    }
    return (
      <Stack
        style={[
          styles.alertContainer,
          { backgroundColor: color, marginBottom: 28 },
        ]}>
        <Image style={{ width: 36 }} source={icons.ALERT_ICON} />
        <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
          <Typography
            fontWeight={FontWeight.bold}
            color={colors.WHITE}
            style={styles.text15}>
            {text.toUpperCase()}
          </Typography>
        </Stack>
      </Stack>
    );
  };

  const renderRecommendation = () => {
    let icon,
      text = '',
      info = '';
    switch (type) {
      case ResultTypes.green:
        icon = icons.HOUSE_ICON;
        text = 'SI es posible, quédate en casa y evita salir';
        info =
          'Si debes salir de casa a trabajar o realizar compras, trata de mantener una distancia de al menos 1 metros con otras personas, evita tocar otras superficies y tu cara. Si toses o estornudas cubre tu nariz y boca con papel higiénico, pañuelos desechables o tu manga; no uses tus manos.';
        break;
      case ResultTypes.yellow:
        icon = icons.HOUSE_ICON;
        text = 'Quédate en casa y CUÍDATE';
        info =
          'Tienes algunos de los síntomas asociados al Coronavirus, pero para resguardar tu salud y la salud de los' +
            ' demás, quédate en casa. No acudas a un centro asistencial y mantén las medidas de aislamiento social.' +
            ' Continúa evaluando tus síntomas a través de la APP. Si éstos empeoran te guiaremos durante los siguientes pasos.';
        break;
      case ResultTypes.orange:
        icon = icons.CALL_ICON;
        text = 'llama a salud responde 600 360 7777';
        info =
          'Tus síntomas indican que podrías tener Coronavirus. Te recomendamos llamar al teléfono de Salud Responde con el fin de indicar si es necesario acudir a un Centro Asistencial o al médico.';
    }
    return (
      <>
        <Stack style={[styles.alertContainer, { marginVertical: 20 }]}>
          <Image source={icon} />
          <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
            <Typography
              fontWeight={FontWeight.bold}
              color={colors.PURPLE}
              style={styles.text15}>
              {text.toUpperCase()}
            </Typography>
          </Stack>
        </Stack>
        <Stack style={{ paddingBottom: 30 }}>
          <Typography
            fontWeight={FontWeight.regular}
            color={colors.BLACK}
            style={{
              fontSize: 14,
              fontWeight: '100',
              letterSpacing: 0.15,
              lineHeight: 20,
            }}>
            {info}
          </Typography>
          {type === ResultTypes.orange && (
            <Typography
              fontWeight={FontWeight.bold}
              color={colors.BLACK}
              style={{ paddingTop: 30 }}>
              No acudas a una farmacia o a urgencia.
            </Typography>
          )}
        </Stack>
      </>
    );
  };

  const renderBottomInfo = () => {
    if (type === ResultTypes.orange) {
      return (
        <>
          <Stack style={[styles.alertContainer, { paddingVertical: 30 }]}>
            <Image source={icons.HEART_ICON} />
            <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
              <Typography
                fontWeight={FontWeight.bold}
                color={colors.PURPLE}
                style={styles.text15}>
                {'Monitorea tus síntomas y los de tu familia '.toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            fontWeight={FontWeight.regular}
            color={colors.BLACK}
            style={styles.fontSize16}>
            Si vives con más personas, es posible que ellas también estén
            contagiadas. Evalúa constantemente tus síntomas, así como de los
            demás a través de la App. Mantén las buenas prácticas de higiene
          </Typography>
          <Stack
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: 30,
            }}>
            <Image
              source={icons.ALERT_PURPLE_ICON}
              style={{ marginRight: 10 }}
            />
            <Typography
              fontWeight={FontWeight.bold}
              color={colors.BLACK}
              style={[styles.textWithFlex, { flex: 1, flexWrap: 'wrap' }]}>
              Si tus labios o uñas cambian de color a un tono azulado, o sientes
              desorientación o mareos, busca ayuda de inmediato.
            </Typography>
          </Stack>
        </>
      );
    }

    return (
      <>
        <Stack style={[styles.alertContainer, { paddingVertical: 30 }]}>
          <Image source={icons.HAND_WASH_ICON} />
          <Stack style={{ width: Dimensions.get('window').width * 0.6 }}>
            <Typography
              fontWeight={FontWeight.bold}
              color={colors.PURPLE}
              style={styles.text15}>
              {'Mantén buenas prácticas de higiene'.toUpperCase()}
            </Typography>
          </Stack>
        </Stack>
        {advices.map((advice, index) => (
          <HStack key={index} style={styles.alignItemCenter}>
            <Stack style={styles.circle} />
            <Typography
              fontWeight={FontWeight.regular}
              color={colors.BLACK}
              style={styles.textWithIcon}>
              {advice}
            </Typography>
          </HStack>
        ))}
        <Typography
          fontWeight={FontWeight.regular}
          color={colors.BLACK}
          style={styles.textWithIcon}>
          Mantente atento a cualquier nuevo síntoma. Puedes usar esta
          autoevaluación todas las veces que quieras.{' '}
        </Typography>
      </>
    );
  };

  if (type === ResultTypes.red) {
    return renderRedType();
  }

  return (
    <VStack style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.content}>
        {renderAlert()}
        <Typography
          fontWeight={FontWeight.regular}
          color={colors.BLACK}
          style={styles.textAlignCenter}>
          Por favor sigue las siguientes recomendaciones:
        </Typography>
        {renderRecommendation()}

        <Stack style={styles.line} />
        {renderBottomInfo()}
        <Stack style={[styles.bottomButton, { paddingBottom: 30 }]}>
          <PrimaryButton
            text={'ir al inicio'}
            onPress={() => {
              navigation.navigate(routes.HOME);
              resetAnalyticsData();
            }}
          />
        </Stack>
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontWeight: '900',
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-around',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  line: {
    height: 2,
    paddingHorizontal: 6,
    backgroundColor: colors.PURPLE,
  },
  textAlignCenter: { textAlign: 'center' },
  bottomButton: {
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  text15: {
    paddingLeft: 20,
    letterSpacing: 0.15,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 20,
  },
  textWithIcon: { fontSize: 16, padding: 15 },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.LIGHT_BLUE,
  },
  divContainer: { alignItems: 'center' },
  fontSize16: { fontSize: 16 },
  alignItemCenter: {
    alignItems: 'center',
  },
  textWithFlex: { fontSize: 16, paddingLeft: 10 },
});

export default ResultScreen;
