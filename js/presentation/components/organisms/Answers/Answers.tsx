import React from 'react';
import { StyleSheet } from 'react-native';
import ToggleButton from '../../molecules/ToggleButton';

interface Props {
  allowAnswers: Array<number>;
  allowAnswersTexts: Array<string>;
  value?: number;
  onChange?: (answer: number) => void;
}
const Answers = ({
  allowAnswers,
  allowAnswersTexts,
  value,
  onChange = () => {},
}: Props) => {
  return (
    <>
      {allowAnswers.map((allowAnswer: number, index) => {
        return (
          <ToggleButton
            key={index}
            style={styles.toggleButton}
            active={value === allowAnswer}
            text={allowAnswersTexts[index]}
            onPress={() => {
              onChange(allowAnswer);
            }}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flex: 1,
    marginHorizontal: 6,
    marginTop: 20,
  },
});

export default Answers;
