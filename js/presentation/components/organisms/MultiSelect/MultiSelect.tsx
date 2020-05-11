import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import VStack from '../../molecules/VStack/VStack';
import CheckboxText from '../../molecules/CheckboxText';

export interface Option {
  label: string;
  check?: boolean;
  value?: any;
  isExclude?: boolean;
  callback: () => void;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  options: Array<Option>;
  onChange?: (options: Array<Option>) => void;
}
const MultiSelect = ({ style = {}, options, onChange = () => {} }: Props) => {
  return (
    <VStack spaceAround style={style}>
      {options.map((option, index) => (
        <CheckboxText
          key={index}
          text={option.label}
          check={!!option.check}
          onChange={check => {
            const newOptions = [...options];
            newOptions[index] = { ...option, check };

            if (option.isExclude) {
              onChange(
                newOptions.map(newOption => {
                  if (!newOption.isExclude) {
                    newOption.check = false;
                  }
                  return newOption;
                }),
              );
            } else {
              onChange(
                newOptions.map(newOption => {
                  if (newOption.isExclude) {
                    newOption.check = false;
                  }
                  return newOption;
                }),
              );
            }

            onChange(newOptions);
          }}
        />
      ))}
    </VStack>
  );
};

export default MultiSelect;
