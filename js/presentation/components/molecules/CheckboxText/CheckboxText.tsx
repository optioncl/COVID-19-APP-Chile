import React from 'react';
import HStack from '../HStack/HStack';
import CheckBox from '../../atoms/Checkbox';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Alignment } from '../../atoms/Stack';
import Body1 from '../Body1';

interface Props {
  text: string;
  check: boolean;
  onChange?: (check: boolean) => void;
}

const CheckboxText = ({ text, check, onChange = () => {} }: Props) => {
  return (
    <TouchableOpacity onPress={() => onChange(!check)}>
      <HStack verticalAlignItems={Alignment.center} style={styles.container}>
        <CheckBox style={styles.checkBox} check={check} />
        <Body1>{text}</Body1>
      </HStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  checkBox: { marginRight: 16 },
});

export default CheckboxText;
