import 'react-native-gesture-handler';
import React, { useEffect, useState, createContext } from 'react';
import Navigation from './js/presentation/navigation/Navigation';
import Reactotron, { networking } from 'reactotron-react-native';
export const UserContext = createContext(null);
import Notifications from './js/infraestructure/Notifications';
import { Alert, Animated, View } from 'react-native';
import { TestFormProvider } from './js/infraestructure/context/TestFormContext';

import SplashScreen from 'react-native-splash-screen';
import useAnlyticsOpenApp from 'js/infraestructure/analytics/hook/useAnlyticsOpenApp';

declare var global: { HermesInternal: null | {} };

const notifications = new Notifications((notification: any) => {
  // Alert.alert(notification.title, notification.message);
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [user, setUser] = useState(null);

  //TODO: Remove when building to production.
  Reactotron.configure()
    .use(networking())
    .connect();

  notifications.scheduleNotification();

  useAnlyticsOpenApp();

  return (
    <UserContext.Provider value={user}>
      <TestFormProvider>
        <Navigation />
      </TestFormProvider>
    </UserContext.Provider>
  );
};

export default App;
