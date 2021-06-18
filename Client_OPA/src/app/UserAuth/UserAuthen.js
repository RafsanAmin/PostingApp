import React, { useState } from 'react';
import Login from './Login/Login';
import SignUp from './Signup/Signup';

function UserAuthen() {
  const [state, setState] = useState('login');
  return <div>{state === 'login' ? <Login link={setState} /> : <SignUp link={setState} />}</div>;
}

export default UserAuthen;
