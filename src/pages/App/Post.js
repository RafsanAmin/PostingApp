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
import { editContext as EditContext, useEditState } from '../../hooks/useEditState';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import useUserInfo from '../../hooks/useUserInfo';
import Styles from '../../scss/postapp.module.scss';

import useFreeze from '../../hooks/useFreeze';

// AP_S = new post form state
const PostApp = () => {
  const { push } = useRouter();
  const AppStateArr = useAppState('post');
  const EditStateArr = useEditState();

  const [appState, setAppState] = AppStateArr;
  const [editState] = EditStateArr;
  const [alertProp, setAlert] = useAlert();
  const [contState, setContState] = useState();
  console.log(EditStateArr);
  useFreeze(editState.editPost.state || editState.addPost || alertProp.state, [
    editState.editPost,
    editState,
    alertProp,
  ]);
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
            <EditContext.Provider value={EditStateArr}>
              <TopBar
                c={`s ${
                  editState.editPost.state || editState.addPost || alertProp.state ? 'freeze' : ''
                }`}
              />

              {appState.userid && (
                <>
                  <Alert props={alertProp} />
                  <div className={`s ${alertProp.state ? 'freeze' : ''}`}>
                    {' '}
                    <PostHandlerUI />
                  </div>

                  <div
                    className={`s ${
                      editState.editPost.state || editState.addPost || alertProp.state
                        ? 'freeze'
                        : ''
                    }`}
                  >
                    <Header />

                    <ContContext.Provider value={contState}>
                      <Posts />
                    </ContContext.Provider>
                  </div>
                </>
              )}
            </EditContext.Provider>
          </AlertContext.Provider>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default PostApp;
