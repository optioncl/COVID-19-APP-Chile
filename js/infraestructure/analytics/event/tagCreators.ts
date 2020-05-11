import analytics from '@react-native-firebase/analytics';

export const logAppOpen = async () => {
  try {
    await analytics().logAppOpen();
  } catch (error) {}
};

export const setCurrentScreen = async screen => {
  try {
    await analytics().setCurrentScreen(screen, screen);
  } catch (error) {}
};

export const resetAnalyticsData = async () => {
  try {
    await analytics().resetAnalyticsData();
  } catch (error) {}
};

export const logUnlockAchievement = async event => {
  try {
    await analytics().logUnlockAchievement(event);
  } catch (error) {}
};
