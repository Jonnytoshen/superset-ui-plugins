export function capitalizeFirstLetter(val: string): string {
  const firstLetter = val.charAt(0);
  const letters = val.slice(1);
  return `${firstLetter.toUpperCase()}${letters}`;
}

export function formatEventKey(key: string): string {
  const words = key
    .split(':')
    .reverse()
    .map(str => capitalizeFirstLetter(str));
  words.unshift('on');
  return words.join('');
}

export function bindEventsFromProps(
  instance: any,
  eventKeys: string[],
  props: { [key: string]: any },
): void {
  eventKeys.forEach(key => {
    const reactEventKey = formatEventKey(key);
    const listener = props[reactEventKey];
    if (listener && typeof listener === 'function') {
      instance.on(key, listener);
    }
  });
}

export function isNil(val: any): boolean {
  return val === null || val === undefined;
}

export function isNotNil(val: any): boolean {
  return !isNil(val);
}
