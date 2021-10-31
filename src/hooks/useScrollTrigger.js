import { useCallback, useEffect } from 'react';

const useScrollTrigger = (t, d) => {
  const deps = d || [];
  const trigger = useCallback((e) => {
    t(e.target.scrollingElement);
  }, deps);
  useEffect(() => {
    window.addEventListener('scroll', trigger);
    return () => {
      window.removeEventListener('scroll', trigger);
    };
  }, deps);
};

export default useScrollTrigger;
