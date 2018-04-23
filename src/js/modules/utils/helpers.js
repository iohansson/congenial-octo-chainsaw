/* eslint-disable import/prefer-default-export */
export function deepCloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}
