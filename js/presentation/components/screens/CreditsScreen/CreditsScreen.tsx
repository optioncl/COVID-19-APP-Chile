import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import VStack from 'js/presentation/components/molecules/VStack';
import fonts from 'js/presentation/constants/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HStack from '../../molecules/HStack/HStack';
import colors from '../../../../presentation/constants/colors';
import PrimaryButton from '../../molecules/PrimaryButton';
import FromOptionWithLove from '../../molecules/FromOptionWithLove';
import Stack, { Alignment } from '../../atoms/Stack';
import { useNavigation } from '@react-navigation/native';
import routes from 'js/presentation/navigation/routes';
import { resetAnalyticsData } from 'js/infraestructure/analytics/event/tagCreators';

const citySenseURL = 'https://citysense.co/';

const TeamMember = ({ name }) => (
  <Text style={[styles.teamMember]}>{name}</Text>
);

const CreditsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.credits}>Créditos</Text>
        <View style={{ paddingHorizontal: 32, marginBottom: 10 }}>
          <Text style={styles.team}>
            Equipo Diseño <Text style={styles.teamName}>Hackit-19</Text>{' '}
            (España)
          </Text>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'Itzel Urbán'} />
              <TeamMember name={'Kate Ellis'} />
              <TeamMember name={'Paulina Villalón'} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'P. Pongsupath'} />
              <TeamMember name={'Sophie Parsy'} />
              <TeamMember name={'Steffano Barsocchini'} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 32, marginBottom: 10 }}>
          <Text style={styles.team}>
            Equipo Diseño <Text style={styles.teamName}>Option</Text> (Chile)
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'Ariel Oyanedel'} />
              <TeamMember name={'Camila Díaz'} />
              <TeamMember name={'Carolina Delgado'} />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'Grace Lillo'} />
              <TeamMember name={'Jorge Pulgar'} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 32, marginBottom: 10 }}>
          <Text style={styles.team}>
            Equipo desarrollo y QA <Text style={styles.teamName}>Option</Text>{' '}
            (Chile)
          </Text>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'Cristóbal Miranda'} />
              <TeamMember name={'Daniel Caris'} />
              <TeamMember name={'Javier González'} />
              <TeamMember name={'José Nuñez'} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
              }}>
              <TeamMember name={'Pedro Oliva'} />
              <TeamMember name={'Luisana Sandoval'} />
              <TeamMember name={'Marcos Corona'} />
              <TeamMember name={'Victor Mansilla'} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 32, marginBottom: 10 }}>
          <Text style={styles.team}>
            Datos de saturación de centros (Chile)
          </Text>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.citySense}>Citysense</Text>

              <TouchableOpacity
                onPress={async () => {
                  await Linking.openURL(citySenseURL);
                }}
                style={{ flexDirection: 'row' }}>
                <Text style={[styles.link, { marginLeft: 10 }]}>
                  ({citySenseURL})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ display: 'flex', justifyContent: 'space-around' }}>
        <View
          style={{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}
          horizontalAlign={Alignment.center}>
          <PrimaryButton
            text={'Ir al inicio'}
            onPress={() => {
              navigation.navigate(routes.HOME);
              resetAnalyticsData();
            }}
          />
        </View>
        <View
          style={{ marginBottom: 10, marginTop: 20, alignItems: 'center' }}
          horizontalAlign={Alignment.center}>
          <FromOptionWithLove />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  credits: {
    fontFamily: fonts.FONT_FAMILY_BOLD,
    fontSize: 16,
    color: colors.PURPLE,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  team: {
    fontFamily: fonts.FONT_FAMILY,
    fontSize: 14,
    color: colors.PURPLE,
    marginVertical: 20,
  },
  teamName: {
    fontFamily: fonts.FONT_FAMILY_BOLD,
    fontSize: 14,
    color: colors.PURPLE,
    marginVertical: 20,
  },
  teamSection: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  citySense: {
    fontFamily: fonts.FONT_FAMILY_LIGHT,
    fontSize: 14,
  },
  teamMember: {
    fontFamily: fonts.FONT_FAMILY_LIGHT,
    fontSize: 14,
    marginVertical: 2,
  },
  link: {
    fontFamily: fonts.FONT_FAMILY_LIGHT,
    fontSize: 14,
    color: colors.PURPLE,
    textDecorationLine: 'underline',
  },
});

export default CreditsScreen;
