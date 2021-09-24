import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Alert from '../../components/alert';
import Header from '../../components/header/header';
import PostHandlerUI from '../../components/postHandlerUI/postHandlerUI';
import Posts from '../../components/posts/posts';
import TopBar from '../../components/topbar/topbar';
import ContContext from '../../Contexts/ContContext';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, useAppState } from '../../hooks/useAppState';
import Styles from '../../scss/postapp.module.scss';

// AP_S = new post form state
const PostApp = () => {
  const { push } = useRouter();
  const AppStateArr = useAppState('post');
  const [appState, setAppState] = AppStateArr;
  const [alertProp, setAlert] = useAlert();
  const [contState, setContState] = useState();
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
        <AppContext.Provider value={AppStateArr}>
          <AlertContext.Provider value={setAlert}>
            <div
              className={`s ${
                appState.editPost.state || appState.addPost || alertProp.state ? 'freeze' : ''
              }`}
            >
              <TopBar />
            </div>
            {appState.userid && (
              <>
                <Alert props={alertProp} />
                <PostHandlerUI />
                <div
                  className={`s ${
                    appState.editPost.state || appState.addPost || alertProp.state ? 'freeze' : ''
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
