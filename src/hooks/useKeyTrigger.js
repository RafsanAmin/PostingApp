const { useEffect, useCallback } = require('react');

const useKeyTrigger = (fun, deps, key, cond) => {
  const d = deps || [];
  const f = useCallback(fun, d);
  useEffect(() => {
    const fn = (e) => {
      if (e.key === key) {
        f(e);
      }
    };
    const removeListener = () => {
      document.removeEventListener('keyup', fn);
    };
    if (cond) {
      document.addEventListener('keyup', fn);
    } else {
      removeListener();
    }
    return removeListener();
  }, d);
};

export default useKeyTrigger;
