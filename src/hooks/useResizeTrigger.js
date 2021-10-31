import { useCallback, useEffect } from 'react';

const useResizeTrigger = (t, d) => {
  const deps = d || [];
  const trigger = useCallback(t, deps);
  useEffect(() => {
    window.addEventListener('resize', trigger);
    window.addEventListener('orientationchange', trigger);
    return () => {
      window.removeEventListener('resize', trigger);
      window.removeEventListener('orientationchange', trigger);
    };
  }, deps);
};

export default useResizeTrigger;
