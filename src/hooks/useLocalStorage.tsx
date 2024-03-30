import { useCallback } from "react";
import { isEmptyObject } from "../utils/common";

/**
 * Custom hook for interacting with localStorage.
 * @returns Tuple of functions to get and set values in localStorage.
 */
function useLocalStorage<T>(): [
  (key: string) => T | null,
  (key: string, value: T) => void
] {
  /**
   * Gets a value from localStorage.
   * @param key Key of value to get.
   * @returns Value from localStorage, or null if it doesn't exist.
   */
  const getValue = useCallback((key: string): T | null => {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    if (value instanceof Object && isEmptyObject(value)) return null;
    return value;
  }, []);

  /**
   * Sets a value in localStorage.
   * @param key Key of value to set.
   * @param value Value to set.
   */
  const setValue = useCallback((key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [getValue, setValue];
}

export default useLocalStorage;
