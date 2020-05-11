import React, { ReactNode, useState } from 'react';
import { RiskGroupAnswer } from '../../domain/enums/RiskGroupAnswer';
import { Answer } from '../../domain/Answer';
import { DiagnosticBuilder } from 'js/domain/SymtomsHashTable';
interface ProviderProps {
  children: ReactNode | ReactNode[];
}

const defaultValue = {
  setRiskGroupsAnswer: () => {},
  answers: [],
  changeAnswer: () => {},
  isEvaluationReady: () => {},
};

interface TestFormContextType {
  riskGroupsAnswer?: Array<RiskGroupAnswer>;
  setRiskGroupsAnswer: (riskGroupsAnswer: Array<RiskGroupAnswer>) => void;
  answers: Array<Answer>;
  changeAnswer: (answer: Answer) => void;
  isEvaluationReady: () => boolean;
  diagnosticBuilder: DiagnosticBuilder;
}

const TestFormContext = React.createContext<TestFormContextType>(defaultValue);

const TestFormProvider = ({ children }: ProviderProps) => {
  const [riskGroupsAnswer, setRiskGroupsAnswer] = useState<
    Array<RiskGroupAnswer>
  >();
  const [answers, setAnswers] = useState<{}>({});

  const [diagnosticBuilder] = useState(() => new DiagnosticBuilder())

  const changeAnswer = (answer: Answer) => {
    const newAnswers = { ...answers };
    newAnswers[answer.number] = { ...answer };
    setAnswers(newAnswers);
  };

  return (
    <TestFormContext.Provider
      value={{
        riskGroupsAnswer,
        setRiskGroupsAnswer,
        answers,
        changeAnswer,
        diagnosticBuilder,
      }}>
      {children}
    </TestFormContext.Provider>
  );
};

export { TestFormContext, TestFormProvider };
