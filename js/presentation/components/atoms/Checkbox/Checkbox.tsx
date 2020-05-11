import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  check?: boolean;
}
const CheckBox = ({ style = {}, check }: Props) => {
  return (
    <View style={style}>
      {check ? (
        <Image
          style={styles.checked}
          source={require('../../../../../assets/icons/check-enabled.png')}
        />
      ) : (
        <View style={styles.notChecked} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notChecked: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    borderRadius: 1,
  },
  checked: {
    width: 22,
    height: 22,
    margin: -3,
  },
});

export default CheckBox;
