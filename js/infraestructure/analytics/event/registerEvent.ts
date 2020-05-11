import analytics from '@react-native-firebase/analytics';

export default async _event => {
  try {
    const { event, ...eventParams } = _event;
    await analytics().logEvent(event, { ...eventParams });
  } catch (error) {}
};
