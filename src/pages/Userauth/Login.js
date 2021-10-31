/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Alert from '../../components/alert';
import Checkbox from '../../components/checkbox';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { useAlert } from '../../hooks/useAlert';

function Login() {
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [remMe, setRemMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useAlert();
  const Router = useRouter();

  const remMeLabel = 'Remember Me';
  const setLogin = useCallback(async () => {
    setLoading(true);
    console.log({
      username: User.trim(),
      password: Pass.trim(),
      remMe,
    });
    try {
      await UserAuthenAPI.login({
        username: User.trim(),
        password: Pass.trim(),
        remMe,
      });
      Router.push('/');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAlert(() => ({
        state: true,
        title: 'Error!',
        desc: err.data.massage,
        type: 'error',
      }));
    }
  }, [User, Pass, remMe]);
  useEffect(() => {
    const listen = (e) => {
      if (e.which === 13) {
        setLogin();
      }
    };
    document.addEventListener('keypress', listen);
    return () => {
      document.removeEventListener('keypress', listen);
    };
  }, [setLogin]);
  return (
    <>
      <Head>
        <title>Rafpost - Login</title>
      </Head>
      <div className="login-page-cont">
        <Alert props={alert} />
        <div className={`login-form-cont ${alert.state ? 'freeze' : ''}`}>
          <Loading classP="" contClass="login-form" loadState={loading}>
            <div className="supp">
              <div className="login-brand-cont" />
              <i className="fas fa-sign-in-alt" />
              <div className="login-head">
                <h1>Login</h1>
              </div>
              <div>
                <Input type="text" name="Username" value={User} setValue={setUser} />
                <Input type="password" name="Password" value={Pass} setValue={setPass} />
              </div>
              <div className="login-remme">
                <Checkbox setState={setRemMe} state={remMe} label={remMeLabel} />
              </div>
              <div className="buttons">
                <button className="login" type="button" onClick={setLogin}>
                  Login
                </button>
              </div>
              <div className="login-foot">
                <Link href="/Userauth/Signup">
                  <button type="button">Create Account</button>
                </Link>
              </div>
            </div>
          </Loading>
        </div>
      </div>
    </>
  );
}

export default Login;
