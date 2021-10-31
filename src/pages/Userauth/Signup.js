import Head from 'next/head';
import React, { useState } from 'react';
import Alert from '../../components/alert';
import Form from '../../components/signup/Form';
import Verify from '../../components/signup/Verify';
import { useAlert } from '../../hooks/useAlert';

function SignUp() {
  const [userInfo, setUserInfo] = useState(null);
  const [alert, setAlert] = useAlert();
  const style = userInfo
    ? { left: '-100%', transition: '0.3s ease-in-out' }
    : { left: 0, transition: '0.3s ease-in-out' };
  // States
  return (
    <>
      <Head>
        <title>Rafpost - Signup</title>
      </Head>
      <div className="signup-page-cont">
        <Alert props={alert} />
        <div className={`signup-form-cont ${alert.state ? 'freeze' : ''}`}>
          <div style={style} className="signup-roller">
            <Form sui={setUserInfo} alertBox={setAlert} />
            <Verify uinf={userInfo} sui={setUserInfo} alertBox={setAlert} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
