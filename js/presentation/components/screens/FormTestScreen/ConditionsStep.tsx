import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import VStack from '../../molecules/VStack/VStack';
import colors from '../../../constants/colors';
import Subtitle1 from '../../molecules/Subtitle1';
import MultiSelect, { MultiSelectOption } from '../../organisms/MultiSelect';
import PrimaryButton from '../../molecules/PrimaryButton';
import { StepProps } from '../../organisms/StepByStep/StepByStep';
import { Alignment } from '../../atoms/Stack';
import { RiskGroupAnswer } from '../../../../domain/enums/RiskGroupAnswer';
import { TestFormContext } from '../../../../infraestructure/context/TestFormContext';
import { resultConditionEvent } from 'js/infraestructure/analytics/event/eventCreators';

const ConditionsStep = (props: StepProps) => {
  const testFormContext = useContext(TestFormContext);

  const [options, setOptions] = useState<Array<MultiSelectOption>>([
    {
      label: 'Soy mayor de 65 años',
      value: RiskGroupAnswer.olderThan65Years,
      callback: () => testFormContext.diagnosticBuilder.isOlder65(),
    },
    {
      label: 'Diabetes',
      value: RiskGroupAnswer.diabetes,
      callback: () => testFormContext.diagnosticBuilder.hasDiabetes(),
    },
    {
      label: 'Hipertensión arterial',
      value: RiskGroupAnswer.arterialHypertension,
      callback: () => testFormContext.diagnosticBuilder.hasArterialHypertension(),
    },
    {
      label: 'Enfermedades cardíacas',
      value: RiskGroupAnswer.heartDiseases,
      callback: () => testFormContext.diagnosticBuilder.hasHeartDiseases(),
    },
    {
      label: 'Enfermedades respiratoria crónica',
      value: RiskGroupAnswer.chronicRespiratoryDiseases,
      callback: () => testFormContext.diagnosticBuilder.hasChronicRespiratoryDisease(),
    },
    {
      label: 'Cáncer',
      value: RiskGroupAnswer.cancer,
      callback: () => testFormContext.diagnosticBuilder.hasCancer(),
    },
    {
      label: 'Otra enfermedad crónica',
      value: RiskGroupAnswer.otherChronicDisease,
      callback: () => testFormContext.diagnosticBuilder.hasChronicDisease(),
    },
    {
      label: 'Ninguna de las anteriores',
      isExclude: true,
      value: RiskGroupAnswer.noneOfTheAbove,
      callback: () => {
        testFormContext.diagnosticBuilder.withoutConditions();
      },
    },
  ]);

  useEffect(() => {
    if (options) {
      setOptions(options);
      if (options[options.length - 1].check === true) {
        testFormContext.diagnosticBuilder.withoutConditions();
      } else {
        options.filter(option => {
          if (option.check) {
            option.callback();
          }
        });
      }
    }
  });

  const getRiskGroupsAnswer = (): Array<RiskGroupAnswer> => {
    return options.filter(option => option.check).map(option => option.value);
  };

  return (
    <VStack
      fullSize
      horizontalAlignItems={Alignment.center}
      style={styles.container}>
      <VStack spaceAround style={styles.content}>
        <VStack>
          <Subtitle1>
            ¿Cumples con algunas de las siguientes condiciones?
          </Subtitle1>
          <Subtitle1 bold={true} style={{ marginTop: 11 }}>
            Selecciona todas las que tengas.
          </Subtitle1>
        </VStack>

        <MultiSelect
          style={{ marginTop: 20 }}
          options={options}
          onChange={setOptions}
        />

        <VStack horizontalAlignItems={Alignment.center}>
          <PrimaryButton
            style={styles.nextButton}
            text={'Siguiente'}
            disabled={getRiskGroupsAnswer().length === 0}
            onPress={() => {
              const riskGroupAnswer = getRiskGroupsAnswer();
              if (riskGroupAnswer.length > 0) {
                props.next();
              }
            }}
            analytics={resultConditionEvent({ result: getRiskGroupsAnswer() })}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  content: {
    width: 300,
  },
  nextButton: {
    width: 180,
    marginTop: 32,
    marginBottom: 16,
  },
});

export default ConditionsStep;
