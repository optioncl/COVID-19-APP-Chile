import { DiagnosticBuilder } from '../../js/domain/SymtomsHashTable';

describe('DiagnosticBuilder', () => {
  // critical person is >=65 years or has conditions
  it('IS NOT CRITICAL and symptoms 11101 => yellow', () => {
    const builder = new DiagnosticBuilder();
    const diagnostic = builder
      .withoutConditions()
      .headacheOrSoreThroat(true)
      .dryCough(true)
      .fever(true)
      .shortBreath(false)
      .testProblem(true)
      .toDiagnose();

    expect(diagnostic).toBe('yellow');
  });

  it('IS CRITICAL and symptoms 11101 => yellow', () => {
    const builder = new DiagnosticBuilder();
    const diagnosticOlder65 = builder
      .isOlder65()
      .headacheOrSoreThroat(true)
      .dryCough(true)
      .fever(true)
      .shortBreath(false)
      .testProblem(true)
      .toDiagnose();

    const diagnosticWithDiabetes = builder
      .hasDiabetes()
      .headacheOrSoreThroat(true)
      .dryCough(true)
      .fever(true)
      .shortBreath(false)
      .testProblem(true)
      .toDiagnose();

    expect(diagnosticOlder65).toBe('orange');
    expect(diagnosticWithDiabetes).toBe('orange');
  });
});
