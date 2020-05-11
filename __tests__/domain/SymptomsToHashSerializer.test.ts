import { SymptomsToHashSerializer } from '../../js/domain/SymtomsHashTable';

describe('DiagnosticBuilder', () => {
  it('not critical and symptoms 11101 => yellow', () => {
    const serializer = new SymptomsToHashSerializer();
    expect(
      serializer.serialize({
        headache: true,
        dryCough: true,
        fever: true,
        shortOfBreath: false,
        testProblem: true,
      }),
    ).toBe('11101');
  });
});
