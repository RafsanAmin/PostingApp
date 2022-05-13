import { useCallback, useEffect } from 'react';

const useResizeTrigger = (t, d, onInit) => {
  const deps = d || [];
  const trigger = useCallback(t, deps);
  useEffect(() => {
    if (onInit) {
      trigger();
    }
    window.addEventListener('resize', trigger);
    window.addEventListener('orientationchange', trigger);
    return () => {
      window.removeEventListener('resize', trigger);
      window.removeEventListener('orientationchange', trigger);
    };
  }, deps);
};

export default useResizeTrigger;
