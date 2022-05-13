const { useEffect, useCallback } = require('react');

const useKeyTrigger = (fun, deps, key) => {
  const d = deps || [];
  const f = useCallback(fun, d);
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      console.log('dsds');
      console.log(e.key);
      if (e.key === key) {
        f(e);
      }
    });
  }, d);
};

export default useKeyTrigger;
