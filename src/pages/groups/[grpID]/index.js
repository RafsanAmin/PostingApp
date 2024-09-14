import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContContext from '../../../Contexts/ContContext';
import Alert from '../../../components/alert';
import PostHandlerUI from '../../../components/postHandlerUI/postHandlerUI';
import TopBar from '../../../components/topbar/topbar';
import { AlertContext, useAlert } from '../../../hooks/useAlert';
import { AppContext, reloadPost, useAppState } from '../../../hooks/useAppState';
import { editContext as EditContext, useEditState } from '../../../hooks/useEditState';
import useScrollTrigger from '../../../hooks/useScrollTrigger';
import useUserInfo from '../../../hooks/useUserInfo';
import Styles from '../../../scss/postapp.module.scss';

import groupAPI from '../../../API/groupAPI';
import Loading from '../../../components/Loading';
import Main from '../../../components/group/main';
import Profile from '../../../components/group/profile';
import useFreeze from '../../../hooks/useFreeze';

// AP_S = new post form state
const PostApp = ({ grpID }) => {
  const { push } = useRouter();
  const AppStateArr = useAppState('post');
  const EditStateArr = useEditState();

  const [appState, setAppState] = AppStateArr;
  const [editState] = EditStateArr;
  const [alertProp, setAlert] = useAlert();
  const [contState, setContState] = useState();

  useEffect(() => {
    groupAPI
      .getData(grpID)
      .then((resp) => {
        setAppState({ type: 'GRP', grpInfo: resp.data });
      })
      .catch((err) => {
        console.error(err);
        if (err.nonMember) {
          push('/403g');
        } else {
          push('/500');
        }
      });
    setAppState({ type: 'RELOAD_0' });
  }, [appState.fullReload]);
  useFreeze(editState.editPost.state || editState.addPost || alertProp.state, [
    editState.editPost,
    editState,
    alertProp,
  ]);
  useUserInfo(async (status) => {
    if (status.done) {
      setAppState({ type: 'USER_GRP', id: status.id, grpID, name: status.name });

      return 0;
    }
    push('/Userauth/Login');
  }, []);
  useScrollTrigger(
    (e) => {
      reloadPost(e, AppStateArr);
    },
    [AppStateArr]
  );
  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      {AppStateArr[0].grpInfo ? (
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
                      {appState.grpInfo ? (
                        <div style={{ display: 'grid', placeItems: 'center' }}>
                          <ContContext.Provider value={contState}>
                            <Profile />
                            <Main grpInfo={appState.grpInfo} />
                          </ContContext.Provider>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
              </EditContext.Provider>
            </AlertContext.Provider>
          </AppContext.Provider>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
PostApp.getInitialProps = async ({ query }) => {
  try {
    return { grpID: query.grpID, error: false };
  } catch (error) {
    return { error, post: null };
  }
};
export default PostApp;
