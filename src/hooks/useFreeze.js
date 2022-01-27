import { useEffect } from 'react';

const useFreeze = (logic, d) => {
  const deps = d || [];

  useEffect(() => {
    if (logic) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }

    return () => {
      document.querySelector('body').style.overflow = 'auto';
    };
  }, deps);
};

export default useFreeze;
