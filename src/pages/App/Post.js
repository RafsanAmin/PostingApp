/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Alert from '../../components/alert';
import Header from '../../components/header/header';
import PostHandlerUI from '../../components/postHandlerUI/postHandlerUI';
import Posts from '../../components/posts/posts';
import TopBar from '../../components/topbar/topbar';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/postapp.module.scss';
import { AppReducer, initalization } from '../../state/postAppState';
// AP_S = new post form state
const PostApp = () => {
  const Router = useRouter();
  const [appState, setAppState] = useReducer(AppReducer, initalization);
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '', button: null });
  const [AppStateReducer, xy] = useState([appState, setAppState]);
  useEffect(() => {
    const authen = async () => {
      const status = await UserAuthenAPI.authen();
      if (status.done) {
        setAppState({ type: 'USER', id: status.id });
        return 0;
      }
      Router.push('/Userauth/Login');
    };
    authen();
    setTimeout(() => {
      setAlert({
        state: true,
        title: 'Hello',
        desc: 'Welcome to Rafpost!! You can now add our website as App just by clicking Add to Home Button',
        type: 'info',
      });
    }, 6000);
  }, []);
  useEffect(() => {
    xy([appState, setAppState]);
  }, [appState]);
  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      {appState.userid ? (
        <div
          onScroll={({ target }) => {
            if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 500) {
              if (!appState.stop) {
                setAppState({ type: 'RELOAD_1' });
              }
            }
          }}
          className={Styles.postAppWindow}
        >
          <Alert
            state={alert.state}
            header={alert.title}
            text={alert.desc}
            type={alert.type}
            setState={setAlert}
            button={alert.button}
            cIcon={alert.cIcon || false}
          />

          <AppContext.Provider value={AppStateReducer}>
            <AlertContext.Provider value={setAlert}>
              <TopBar />
              <Header />
              <PostHandlerUI />
              <Posts />
            </AlertContext.Provider>
          </AppContext.Provider>
        </div>
      ) : null}
    </>
  );
};

export default PostApp;
