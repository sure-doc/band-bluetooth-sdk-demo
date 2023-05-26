const hasOwn = {}.hasOwnProperty;

export type Value = string | number | boolean | undefined | null;
export type Mapping = Record<string, unknown>;
export type ArgumentArray = Array<Argument>;
export type Argument = Value | Mapping | ArgumentArray;

export function moduleClassNames(styles: Record<string, string>, ...args: ArgumentArray): string {
  const classes: Array<string | number> = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    let argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg as string | number);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        let inner = moduleClassNames(styles, ...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        for (let key in arg as Mapping) {
          if (hasOwn.call(arg, key) && (arg as Mapping)[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.map((name) => styles[name]).join(' ');
}
