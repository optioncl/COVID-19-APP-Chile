// @ts-ignore
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { PermissionsAndroid, Platform } from 'react-native';

const inmediateCall = (phone: string | number) =>
  RNImmediatePhoneCall.immediatePhoneCall(phone);
const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
let permissionConfiguration = {
  title: 'Llamar',
  message: 'Realizar llamados a números telefonicos',
  buttonNegative: 'No',
  buttonPositive: 'Si',
};
const makeCall = (phone: string | number | undefined) => {
  if (!phone) {
    return;
  }

  if (isIos) {
    inmediateCall(phone);
    return;
  }

  if (!isAndroid) {
    return;
  }

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    permissionConfiguration,
  ).then(granted => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      inmediateCall(phone);
    }
  });
};

export default makeCall;
