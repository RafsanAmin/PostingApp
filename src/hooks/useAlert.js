import { useState } from 'react';
import AlertContext from '../Contexts/AlertContext';
import useKeyTrigger from './useKeyTrigger';

const init = { state: false, title: '', desc: '', type: '', button: null, cIcon: null };
const useAlert = () => {
  const [alert, setAlert] = useState(init);
  useKeyTrigger(
    () => {
      if (alert.state) {
        setAlert(init);
      }
    },
    [alert.state],
    'Escape'
  );
  return [{ ...alert, setState: setAlert }, setAlert];
};
export { useAlert, AlertContext };
