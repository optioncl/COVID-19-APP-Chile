import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const addTestResult = async results => {
  try {
    await firestore()
      .collection('test_results')
      .add({
        results,
        uniqueId: DeviceInfo.getUniqueId(),
        deviceId: DeviceInfo.getDeviceId(),
        deviceType: DeviceInfo.getDeviceType(),
        os: Platform.OS,
        fingerPrint: await DeviceInfo.getFingerprint(),
        occurredOn: new Date(),
      });
    console.log('Test result added: ', results);
  } catch (e) {
    console.error('Error to add Test result', e, results);
  }
};

const getOnlyDocs = docs => {
  const { _data } = docs;

  return _data;
};
const getHealthcare = async () => {
  try {
    let { docs } = await firestore()
      .collection('healthcares')
      .get();

    return docs.map(getOnlyDocs);
  } catch (e) {
    return [];
  }
};

const getBranchIdsOfHealthcares = async () => {
  try {
    const healthcares = await getHealthcare();
    return healthcares
      .map(healthcare => {
        const { BranchId } = healthcare;
        return BranchId;
      })
      .filter(value => value !== undefined);
  } catch (e) {
    return [];
  }
};

export default { getHealthcare, getBranchIdsOfHealthcares, addTestResult };
