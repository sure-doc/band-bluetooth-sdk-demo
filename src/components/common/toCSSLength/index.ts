export function toCSSLength(val: string | number, unit = 'px') {
  return typeof val === 'number' ? `${val}${unit}` : val;
}
