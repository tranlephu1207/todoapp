import _ from 'lodash';

/**
 * Converts an array of items into a object map by key field
 * @example
 * [{id: "1", foo: "bar"}] -> {"1": {id: "1", foo:"bar"} }
 * @param key the field used as unique key
 * @param array the array of items to convert
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayToMap<T>(key: keyof T, array: any[]): Record<string, T> {
  if (!array) {
    return {};
  }

  const records = array.reduce<Record<string, T>>((record, item) => {
    record[item[key]] = item;
    return record;
  }, {});

  return records;
}

export const removeInvalidPropertyInObjects = (obj: Record<string, unknown>): Record<string, unknown> =>
  _.omitBy(obj, (v) =>
    _.isBoolean(v) || _.isFinite(v) || _.isObject(v)
      ? false
      : typeof v === 'undefined' || v === null || _.isEmpty(v),
  );
