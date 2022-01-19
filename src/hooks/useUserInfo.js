import { useCallback, useEffect } from 'react';
import UserAuthenAPI from '../API/UserAuthen';

const useUserInfo = (c, d) => {
  const deps = d || [];
  const callback = useCallback(c, deps);
  useEffect(() => {
    const main = async () => {
      try {
        const self = await UserAuthenAPI.authen();
        callback(self);
      } catch {
        callback({ id: null });
      }
    };
    main();
  }, deps);
};
export default useUserInfo;
