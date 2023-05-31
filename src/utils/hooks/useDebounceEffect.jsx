import { useEffect, useRef } from "react";

const useDebounceEffect = (callback, delay, dependencies) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, dependencies);
};

export default useDebounceEffect;
