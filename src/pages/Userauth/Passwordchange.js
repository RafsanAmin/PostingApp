import React, { useReducer } from 'react';
import Alert from '../../components/alert';
import Loading from '../../components/Loading';
import PassChangeForm from '../../components/passchange/passChangeForm';
import ValidationConfirm from '../../components/passchange/validationConfirm';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import Styles from '../../scss/passwordchange.module.scss';

const Passwordchange = () => {
  const pageReducer = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'L_1':
          return { ...state, loading: true };
        case 'L_0':
          return { ...state, loading: false };
        case 'ST_1':
          return {
            state: 1,
            vid: action.vid,
            newPassword: action.nPass,
            user: action.user,
            loading: false,
          };
        case 'RESET':
          return { state: 0, newPassword: null, vid: '', user: {}, loading: false };
        case 'CLEAR':
          return { state: 1, newPassword: null, vid: '', user: {}, loading: false };
        default:
          return state;
      }
    },
    {
      state: 1,
      newPassword: null,
      vid: '',
      user: {},
      loading: false,
    }
  );

  const [alertProp, setAlert] = useAlert();

  return (
    <Loading loadState={pageReducer[0].loading}>
      <div className={Styles.win}>
        <Alert props={alertProp} />

        <div className={Styles.cont}>
          <AlertContext.Provider value={setAlert}>
            <div
              style={pageReducer[0].state ? { transform: 'translateX(-50%)' } : {}}
              className={Styles.roller}
            >
              <PassChangeForm pstate={pageReducer} />
              <ValidationConfirm pstate={pageReducer} />
            </div>
          </AlertContext.Provider>
        </div>
      </div>
    </Loading>
  );
};

export default Passwordchange;
