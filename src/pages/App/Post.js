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
import ContContext from '../../Contexts/ContContext';
import Styles from '../../scss/postapp.module.scss';
import { AppReducer, initalization } from '../../state/postAppState';
// AP_S = new post form state
const PostApp = () => {
  const { push } = useRouter();
  const [appState, setAppState] = useReducer(AppReducer, initalization('post'));
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '', button: null });
  const [contState, setContState] = useState();
  const [AppStateReducer, xy] = useState([appState, setAppState]);
  useEffect(() => {
    const authen = async () => {
      const status = await UserAuthenAPI.authen();
      if (status.done) {
        setAppState({ type: 'USER', id: status.id });
        return 0;
      }
      push('/Userauth/Login');
    };
    authen();
  }, []);
  useEffect(() => {
    xy([appState, setAppState]);
  }, [appState]);
  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      <div
        onScroll={({ target }) => {
          if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 500) {
            if (!appState.stop) {
              setAppState({ type: 'RELOAD_1' });
            }
          }
        }}
        ref={(e) => setContState(e)}
        className={Styles.postAppWindow}
      >
        <AppContext.Provider value={AppStateReducer}>
          <AlertContext.Provider value={setAlert}>
            <div
              className={`s ${
                appState.editPost.state || appState.addPost || alert.state ? 'freeze' : ''
              }`}
            >
              <TopBar />
            </div>
            {appState.userid && (
              <>
                <Alert
                  state={alert.state}
                  header={alert.title}
                  text={alert.desc}
                  type={alert.type}
                  setState={setAlert}
                  button={alert.button}
                  cIcon={alert.cIcon || false}
                />
                <PostHandlerUI />
                <div
                  className={`s ${
                    appState.editPost.state || appState.addPost || alert.state ? 'freeze' : ''
                  }`}
                >
                  <Header />
                  <ContContext.Provider value={contState}>
                    <Posts />
                  </ContContext.Provider>
                </div>
              </>
            )}
          </AlertContext.Provider>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default PostApp;
