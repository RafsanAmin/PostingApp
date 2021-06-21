/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import Input from '../../UI-COMPS/Input';

function Login() {
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [status, setstatus] = useState('NoStatus');
  const [remMe, setRemMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const setLogin = async () => {
    setLoading(true);
    try {
      const x = await UserAuthenAPI.login({
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
  const remMeCheck = (checked) => {
    setRemMe(!checked);
  };
  return (
    <>
      <div className="login-page-cont">
        <div className="login-form-cont">
          <div className={`${loading ? 'loading-cont' : 'load-none'}`} />
          <div className={`login-form${loading ? ' loading' : ''}`}>
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
              <div className="login-remme" onClick={() => remMeCheck(remMe)}>
                <div className={remMe ? 'checkbox checked' : 'checkbox'} />

                <p>Remember Me</p>
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
                    Router.push('/userauth/signup');
                  }}
                >
                  Create Account
                </button>
                <p style={status === 'NoStatus' ? { opacity: 0 } : { opacity: 1 }}>{status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
