/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import UserAuthenAPI from './API/UserAuthen';
import PostApp from './app/PostApp/PostApp';
import UserAuthen from './app/UserAuth/UserAuthen';
import UserContext from './context/LoginContext';
import './css/style.css';
import './images/fav/all.min.css';

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [error, setErrored] = useState(false);
  useEffect(() => {
    const authen = async () => {
      try {
        const status = await UserAuthenAPI.authen();
        setLoggedIn(status.done);
        console.dir(status);
      } catch {
        setErrored(true);
      }
    };
    authen();
  }, []);
  useEffect(() => {
    const logout = async () => {
      await UserAuthenAPI.logout();
    };
    return () => {
      logout();
    };
  }, []);
  return (
    <div className="App">
      {!error ? (
        <>
          {loggedin ? (
            <PostApp />
          ) : (
            <UserContext.Provider value={{ loggedin, setLoggedIn }}>
              <UserAuthen />
            </UserContext.Provider>
          )}
        </>
      ) : (
        <h1>Error</h1>
      )}
    </div>
  );
}

export default App;
