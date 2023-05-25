export function renderIf<T, R1, R2>(options: {
  value?: T;
  test?: boolean | ((value: T) => any);
  success?: ((value: T) => R1) | R1;
  fail?: ((value: T) => R2) | R2;
}) {
  const { value, test, success, fail } = options;
  const testResult = typeof test === 'function' ? test(value!) : 'test' in options ? test : value;

  if (testResult) {
    return typeof success === 'function'
      ? (success as (value: T) => R1)(value!)
      : 'success' in options
      ? success
      : value;
  }

  return typeof fail === 'function' ? (fail as (value: T) => R2)(value!) : fail;
}
