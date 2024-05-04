import { flatArray, get } from './collections';

const simpleInterpolator = /\{([^{}]+)\}/g;

type Data = Record<string, any>;

export function interpolate(format: string, data?: Data | Data[], interpolator: RegExp = simpleInterpolator) {
  return format.replace(interpolator, (_: string, path: string) => {
    const value = get(path, ...flatArray([data]));
    return '' + value;
  });
}
