/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Form from './components/Form';
import Verify from './components/Verify';
// import UserAuthenAPI from '../../../API/UserAuthen';
// import Input from '../../ui-components/Input';

function SignUp() {
  const [userInfo, setUserInfo] = useState(null);
  const style = userInfo
    ? { left: '-100%', transition: '0.3s ease-in-out' }
    : { left: 0, transition: '0.3s ease-in-out' };
  // States
  return (
    <div className="signup-page-cont">
      <div className="signup-form-cont">
        <div style={style} className="signup-roller">
          <Form sui={setUserInfo} />
          <Verify uinf={userInfo} sui={setUserInfo} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
