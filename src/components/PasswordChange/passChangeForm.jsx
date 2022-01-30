import React, { useContext, useEffect, useReducer } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import AlertContext from '../../Contexts/AlertContext';
import Styles from '../../scss/passwordchange.module.scss';
import Input from '../Input';
import Label from '../label';

const PassChangeForm = ({ pstate }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_F':
          return { ...prevState, [action.fName]: action.value };
        default:
          return prevState;
      }
    },
    {
      username: '',
      pass: '',
      confPass: '',
    }
  );

  const [, pdispatch] = pstate;
  const Alert = useContext(AlertContext);
  const sF = (t, f) => dispatch({ type: 'SET_F', fName: f, value: t });
  const verifyClick = async () => {
    pdispatch({ type: 'L_1' });
    UserAuthenAPI.verifyForUpdateData({ ...state, email: 'a@gmail.com' }, true)
      .then(({ user, vid }) => {
        pdispatch({
          type: 'ST_1',
          vid,
          nPass: state.pass,
          user,
        });
      })
      .catch((err) => {
        pdispatch({ type: 'L_0' });
        Alert({
          state: true,
          title: 'Error!',
          desc: err,
          type: 'error',
        });
      });
  };
  useEffect(() => {}, []);
  return (
    <div className={Styles.contPer}>
      <div className={Styles.inner}>
        <h2 className={Styles.title}>
          <i className="fas fa-user-lock" />
          <br /> Change Your Password
        </h2>
        <Label>Username</Label>
        <Input
          value={state.username}
          setValue={(t) => sF(t, 'username')}
          type="text"
          name="Username"
        />
        <Label>Type Your New Password Here</Label>
        <Input
          value={state.pass}
          setValue={(t) => sF(t, 'pass')}
          type="password"
          name="New Password"
        />
        <Input
          value={state.confPass}
          setValue={(t) => sF(t, 'confPass')}
          type="password"
          name="Confirm Password"
        />
        <p className={Styles.warn}>
          <i className="fas fa-exclamation-triangle    " />
          <br />
          We will send an email to your email addres given to your account to verify its you.
        </p>
        <div className={Styles.button}>
          <button className="login" type="button" onClick={verifyClick}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassChangeForm;
