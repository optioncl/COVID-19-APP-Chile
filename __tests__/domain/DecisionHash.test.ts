import { SymptomsHashTable } from '../../js/domain/SymtomsHashTable';

describe('DecisionHash', () => {
  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento:1
  it('hash 1111 should return red', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('1111')).toBe('red');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento':0 | 'test respiracion':1
  it('hash 11101 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('11101')).toBe('yellow');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento':0 | 'test respiracion':0
  it('hash 11100 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('11100')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':1
  it('hash 1101 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('1101')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':1
  it('hash 1101 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('1101')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 1
  it('hash 11001 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('11001')).toBe('yellow');
  });

  // 'dolor-garganta': 1 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracion': 1
  it('hash 11001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('110001')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':1
  it('hash 1011 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('1011')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 1
  it('hash 10101 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('10101')).toBe('yellow');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 1
  it('hash 101001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('101001')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 0
  it('hash 101000 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('101000')).toBe('yellow');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':1
  it('hash 1001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('1001')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':1 | 'test-respiratorio': 0 | 'peor-respiracioon': 1
  it('hash 100001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('100001')).toBe('orange');
  });

  // 'dolor-garganta': 1 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':1 | 'test-respiratorio': 0 | 'peor-respiracioon': 0
  it('hash 100000 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('100000')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento':1 | 'test-respiratorio': undefined | 'peor-respiracioon': undefined
  it('hash 0111 should return red', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('0111')).toBe('red');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 1 | 'peor-respiracioon': undefined
  it('hash 01101 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('01101')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': undefined
  it('hash 01100 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('01100')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':1 | 'test-respiratorio': undefined | 'peor-respiracioon': undefined
  it('hash 0101 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('0101')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 1 | 'peor-respiracioon': undefined
  it('hash 01001 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('01001')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 1
  it('hash 010001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('010001')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':1 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 0
  it('hash 010000 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('010000')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':1 | 'test-respiratorio': undefined | 'peor-respiracioon': undefined
  it('hash 0011 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('0011')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 1 | 'peor-respiracioon': undefined
  it('hash 00101 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('00101')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 1
  it('hash 001001 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('001001')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':1 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 0
  it('hash 001000 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('001000')).toBe('yellow');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':1 | 'test-respiratorio': undefined | 'peor-respiracioon': undefined
  it('hash 0001 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('0001')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 1 | 'peor-respiracioon': undefined
  it('hash 00001 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('00001')).toBe('green');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 1
  it('hash 000001 should return orange', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('000001')).toBe('orange');
  });

  // 'dolor-garganta': 0 | 'tos-seca':0 | 'fiebre':0 | 'falta de aliento':0 | 'test-respiratorio': 0 | 'peor-respiracioon': 0
  it('hash 000000 should return yellow', () => {
    const hash = new SymptomsHashTable();
    expect(hash.evaluate('000000')).toBe('yellow');
  });
});
