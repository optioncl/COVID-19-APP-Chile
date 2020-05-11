import analytics from '@react-native-firebase/analytics';

export default async event => {
  try {
    event?.level === 0
      ? await analytics().logLevelStart({ level: event?.level })
      : await analytics().logLevelUp(event);
  } catch (error) {}
};
