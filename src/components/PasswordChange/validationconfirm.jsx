import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import AlertContext from '../../Contexts/AlertContext';
import Styles from '../../scss/passwordchange.module.scss';
import Input from '../Input';
import Label from '../label';

const ValidationConfirm = ({ pstate }) => {
  const [state, dispatch] = pstate;
  const [code, setCode] = useState();
  const Router = useRouter();
  const emailTrimmer = (mail = 'dssd') => {
    const mailArray = mail.split('@');
    const trimmed = mailArray[0].slice(-5);
    return `****${trimmed}@${mailArray[1]}`;
  };
  const email = emailTrimmer(state.user.email);
  const Alert = useContext(AlertContext);
  const changePass = () => {
    console.log('dsad', {
      id: state.user.id,
      pass: state.newPassword,
      code,
      vid: state.vid,
    });
    dispatch({ type: 'L_1' });
    UserAuthenAPI.changePass({
      id: state.user.id,
      pass: state.newPassword,
      code,
      vid: state.vid,
    })
      .then((res) => {
        Alert({
          state: true,
          title: 'Success!',
          desc: res,
          type: 'success',
        });
        dispatch({ type: 'CLEAR' });
        setTimeout(() => Router.push('/'), 2000);
      })
      .catch((err) => {
        dispatch({ type: 'L_0' });
        Alert({
          state: true,
          title: 'Error!',
          desc: err,
          type: 'error',
        });
      });
  };
  return (
    <div className={Styles.contPer}>
      <div className={Styles.inner}>
        <div className={Styles.gb}>
          <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
            <i className="fas fa-arrow-left    " /> Go Back
          </button>
        </div>
        <h2 className={Styles.title}>
          <i className="fas fa-user-check" />
          <br />
          Verify
        </h2>
        <Label>
          An email has been sent to <b>{email}.</b> Submit your code here and change your password.
          If you are having issues then go back.
        </Label>
        <Input type="text" name="Code" value={code} setValue={setCode} limit="6" />
        <div className={Styles.button}>
          <button type="button" onClick={changePass}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationConfirm;
