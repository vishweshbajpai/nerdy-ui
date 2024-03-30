/**
 * Returns whether the given object is empty, i.e. has no own enumerable
 * properties.
 * @param obj The object to check. Must be an object, otherwise returns true.
 * @returns Whether the object is empty.
 */
export const isEmptyObject = <T extends object>(obj: T): boolean => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

export const isBinaryNumber = (input: string) => {
  if (!input) return false;
  // Regular expression to match only 0s and 1s
  const binaryRegex = /^[01]+$/;

  // Test if the input matches the binary regex
  return binaryRegex.test(input);
};

export const getUserBirthYear = (age: number) => {
  if (age) {
    return new Date().getFullYear() - age;
  }
};
