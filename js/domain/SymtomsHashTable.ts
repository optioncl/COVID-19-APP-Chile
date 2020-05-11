interface HashTable<T> {
  [key: string]: T;
}

interface Symptoms {
  headache: boolean | undefined;
  dryCough: boolean | undefined;
  fever: boolean | undefined;
  shortOfBreath: boolean | undefined;
  canDoRespiratoryTest: boolean | undefined;
  testProblem: boolean | undefined;
}

export class SymptomsToHashSerializer {
  private static _boolToString(value: boolean | undefined): string {
    if (undefined === value) {
      return '';
    }
    return !value ? '0' : '1';
  }
  serialize(symptoms: Symptoms) {
    // @ts-ignore
    const mappedChars = Object.values(symptoms).map(value =>
      SymptomsToHashSerializer._boolToString(value),
    );
    return mappedChars.join('');
  }
}

export class SymptomsHashTable {
  static table: HashTable<string> = {
    '0001': 'orange',
    '0011': 'orange',
    '0101': 'orange',
    '0111': 'red',
    '1001': 'orange',
    '1011': 'orange',
    '1101': 'orange',
    '1111': 'red',
    '111100': 'green',
    '11111': 'green',
    '00001': 'green',
    '00101': 'yellow',
    '01001': 'yellow',
    '01100': 'orange',
    '01101': 'yellow',
    '10001': 'yellow',
    '10101': 'yellow',
    '11001': 'yellow',
    '11100': 'orange',
    '11101': 'yellow',
    '000000': 'yellow',
    '000001': 'orange',
    '001000': 'yellow',
    '001001': 'orange',
    '010000': 'yellow',
    '010001': 'orange',
    '100000': 'yellow',
    '100001': 'orange',
    '101000': 'yellow',
    '101001': 'orange',
    '110000': 'yellow',
    '110001': 'orange',
    '110101': 'orange',
  };

  constructor() {}

  evaluate(hash: string) {
    return SymptomsHashTable.table[hash];
  }
}

export class DiagnosticBuilder {
  private _defaultConditions = {
    older65: false,
    diabetes: false,
    arterialHypertension: false,
    heartDiseases: false,
    chronicRespiratoryDisease: false,
    cancer: false,
    chronicDisease: false,
  };

  private _defaultSymptoms: Symptoms = {
    headache: undefined,
    dryCough: undefined,
    fever: undefined,
    shortOfBreath: undefined,
    canDoRespiratoryTest: undefined,
    testProblem: undefined,
  };

  private _symptoms: Symptoms;
  private _conditions;

  private _hasOtherCondition: boolean = false;

  constructor() {
    this.reset();
  }

  reset() {
    this._symptoms = Object.assign({}, this._defaultSymptoms);
    this._conditions = Object.assign({}, this._defaultConditions);
  }

  isOlder65() {
    this._conditions.older65 = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasDiabetes() {
    this._conditions.diabetes = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasArterialHypertension() {
    this._conditions.arterialHypertension = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasHeartDiseases() {
    this._conditions.heartDiseases = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasChronicRespiratoryDisease() {
    this._conditions.chronicRespiratoryDisease = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasCancer() {
    this._conditions.cancer = true;
    this._hasOtherCondition = true;
    return this;
  }

  hasChronicDisease() {
    this._conditions.chronicDisease = true;
    this._hasOtherCondition = true;
    return this;
  }

  private _isCritical() {
    return Object.values(this._conditions).filter(condition => condition).length > 0;
  }

  withoutConditions() {
    this._hasOtherCondition = false;
    this._conditions.older65 = false;
    this._conditions.diabetes = false;
    this._conditions.arterialHypertension = false;
    this._conditions.heartDiseases = false;
    this._conditions.chronicRespiratoryDisease = false;
    this._conditions.cancer = false;
    this._conditions.chronicDisease = false;
    return this;
  }

  headacheOrSoreThroat(value: boolean) {
    this._symptoms.headache = value;
    return this;
  }

  dryCough(value: boolean) {
    this._symptoms.dryCough = value;
    return this;
  }

  fever(value: boolean) {
    this._symptoms.fever = value;
    return this;
  }

  shortBreath(value: boolean) {
    this._symptoms.shortOfBreath = value;
    return this;
  }

  canDoRespiratoryTest(value: boolean) {
    this._symptoms.canDoRespiratoryTest = value;
    return this;
  }

  testProblem(value: boolean) {
    this._symptoms.testProblem = value;
    return this;
  }

  symptomsHash() {
    return new SymptomsToHashSerializer().serialize(this._symptoms);
  }

  toDiagnose() {
    const hash = new SymptomsHashTable();
    const symptomsHash = new SymptomsToHashSerializer().serialize(
      this._symptoms,
    );

    // @ts-ignore
    if (this._isCritical() && ['11101', '10101'].includes(symptomsHash)) {
      return 'orange';
    }

    return hash.evaluate(symptomsHash);
  }

  toTestResult() {
    return {
      symptoms: {
        ...this._symptoms,
      },
      conditions: {
        ...this._conditions,
      },
      result: this.toDiagnose(),
      hash: new SymptomsToHashSerializer().serialize(this._symptoms),
      isCritical: this._isCritical(),
    };
  }
}
