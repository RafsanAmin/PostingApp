/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import UserContext from '../../../context/LoginContext';
import Input from '../../ui-components/Input';

function Login(props) {
  const Context = useContext(UserContext);
  const { setLoggedIn } = Context;

  // States
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [status, setstatus] = useState('NoStatus');
  const [remMe, setRemMe] = useState(true);
  const { link } = props;
  const setLogin = async () => {
    try {
      const x = await UserAuthenAPI.login({ username: User, password: Pass, remMe });
      setLoggedIn(x.done);
    } catch (err) {
      setstatus(err.data.massage);
    }
  };
  const remMeCheck = (checked) => {
    setRemMe(!checked);
  };
  return (
    <div className="login-page-cont">
      <div className="login-form-cont">
        <div className="login-form">
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
                  link('signup');
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
  );
}

export default Login;
