import { useState } from 'react';
import AlertContext from '../Contexts/AlertContext';

const useAlert = () => {
  const [alert, setAlert] = useState({
    state: false,
    title: '',
    desc: '',
    type: '',
    button: null,
    cIcon: null,
  });
  return [{ ...alert, setState: setAlert }, setAlert];
};
export { useAlert, AlertContext };
