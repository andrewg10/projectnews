import { useCallback, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (valueOrFn) => {
      try {
        const valueToStore =
          typeof valueOrFn === "function" ? valueOrFn(storedValue) : valueOrFn;

        localStorage.setItem(key, JSON.stringify(valueToStore));
        setStoredValue(valueToStore);
      } catch (err) {
        console.error("useLocalStorage write error:", err);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
