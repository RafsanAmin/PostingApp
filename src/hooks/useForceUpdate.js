import { useState } from 'react';

const useForceUpdate = () => {
  const [s, ss] = useState(0);
  const re = () => {
    ss(Math.random());
  };
  return [s, re];
};
export default useForceUpdate;
