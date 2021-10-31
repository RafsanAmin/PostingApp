import { useState } from 'react';

const useForceUpdate = () => {
  const [s, ss] = useState();
  const re = () => {
    ss(Math.random());
  };
  return [s, re];
};
export default useForceUpdate;
