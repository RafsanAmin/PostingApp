import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import Checkbox from '../../components/checkbox';
import Input from '../../components/Input';
import Loading from '../../components/Loading';

function Login() {
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [status, setstatus] = useState('NoStatus');
  const [remMe, setRemMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const remMeLabel = 'Remember Me';
  const setLogin = async () => {
    setLoading(true);
    try {
      await UserAuthenAPI.login({
        username: User,
        password: Pass,
        remMe,
      });
      Router.push('/');
      setLoading(false);
    } catch (err) {
      setstatus(err.data.massage);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Rafpost - Login</title>
      </Head>
      <div className="login-page-cont">
        <div className="login-form-cont">
          <Loading classP="" contClass="login-form" loadState={loading}>
            <div className="supp">
              <div className="login-brand-cont" />
              <i className="fas fa-sign-in-alt" />
              <div className="login-head">
                <h1>Login</h1>
              </div>
              <div>
                <Input type="text" name="Username" value={User} setValue={setUser} classP="login" />
                <Input
                  type="password"
                  name="Password"
                  value={Pass}
                  setValue={setPass}
                  classP="login"
                />
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
                <button
                  type="button"
                  onClick={() => {
                    Router.push('/Userauth/Signup');
                  }}
                >
                  Create Account
                </button>
                <p style={status === 'NoStatus' ? { opacity: 0 } : { opacity: 1 }}>{status}</p>
              </div>
            </div>
          </Loading>
        </div>
      </div>
    </>
  );
}

export default Login;
