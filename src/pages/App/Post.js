import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Alert from '../../components/alert';
import Header from '../../components/header/header';
import PostHandlerUI from '../../components/postHandlerUI/postHandlerUI';
import Posts from '../../components/posts/posts';
import TopBar from '../../components/topbar/topbar';
import ContContext from '../../Contexts/ContContext';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, reloadPost, useAppState } from '../../hooks/useAppState';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import useUserInfo from '../../hooks/useUserInfo';
import Styles from '../../scss/postapp.module.scss';
// AP_S = new post form state
const PostApp = () => {
  const { push } = useRouter();
  const AppStateArr = useAppState('post');
  const [appState, setAppState] = AppStateArr;
  const [alertProp, setAlert] = useAlert();
  const [contState, setContState] = useState();
  useUserInfo(async (status) => {
    if (status.done) {
      setAppState({ type: 'USER', id: status.id });
      return 0;
    }
    push('/Userauth/Login');
  }, []);
  useScrollTrigger(
    (e) => {
      console.log('Helllo');
      reloadPost(e, AppStateArr);
    },
    [AppStateArr]
  );
  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      <div ref={(e) => setContState(e)} className={Styles.postAppWindow}>
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
