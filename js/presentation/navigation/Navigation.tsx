import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setCurrentScreen } from 'js/infraestructure/analytics/event/tagCreators';

// Screens
import HomeScreen from '../components/screens/HomeScreen/HomeScreen';
import EvaluationReadyScreen from '../components/screens/EvaluationReadyScreen/EvaluationReadyScreen';
import FormTestScreen from '../components/screens/FormTestScreen';
import ResultScreen from '../components/screens/ResultScreen';
import CreditsScreen from '../components/screens/CreditsScreen';

// Components
import Logotype from '../components/atoms/Logotype';

// Constants
import routes from './routes';
import { Image, View } from 'react-native';
import DisclaimerScreen from '../components/screens/DisclaimerScreen';
import HealthcareServiceScreen from 'js/presentation/components/screens/HealthcareServiceScreen';

const Stack = createStackNavigator();

const NavBar = props => <Logotype {...props} />;

const BackImage = () => (
  <View style={{ paddingLeft: 16 }}>
    <Image source={require('../../../assets/icons/arrow-back.png')} />
  </View>
);

// lear more: https://reactnavigation.org/docs/screen-tracking/#example
// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const Navigation = () => {
  const headerOptions = {
    headerBackImage: BackImage,
    headerBackTitleVisible: false,
    headerTitle: NavBar,
    cardShadowEnabled: false,
    headerStyle: {
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
  };

  const disableBackButton = { headerLeft: false, gestureEnabled: false };
  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          // The line below uses the @react-native-firebase/analytics tracker
          // Change this line to use another Mobile analytics SDK
          setCurrentScreen(currentRouteName, currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name={routes.HOME}
          component={HomeScreen}
          options={headerOptions}
        />

        <Stack.Screen
          name={routes.FORM_TEST}
          component={FormTestScreen}
          options={headerOptions}
        />

        <Stack.Screen
          name={routes.EVALUATION_READY_TEST}
          component={EvaluationReadyScreen}
          options={{ ...headerOptions, ...disableBackButton }}
        />

        <Stack.Screen
          name={routes.RESULTS}
          component={ResultScreen}
          options={{ ...headerOptions, ...disableBackButton }}
        />

        <Stack.Screen
          name={routes.CREDITS}
          component={CreditsScreen}
          options={headerOptions}
        />

        <Stack.Screen
          name={routes.DISCLAIMER}
          component={DisclaimerScreen}
          options={headerOptions}
        />
        <Stack.Screen
          name={routes.HEALTHCARESERVICE}
          component={HealthcareServiceScreen}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
