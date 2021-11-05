import Head from 'next/head';
import { useState } from 'react';
import ContContext from '../../Contexts/ContContext';
import UserContext from '../../Contexts/UserContext';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, reloadPost, useAppState } from '../../hooks/useAppState';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import useUserInfo from '../../hooks/useUserInfo';
import Alert from '../alert';
import Error from '../error';
import PostHandlerUI from '../postHandlerUI/postHandlerUI';
import Postlist from '../posts/postlist';
import Title from '../title';
import TopBar from '../topbar/topbar';
import ProfileCard from './profile/profileCard';
import UserSetUICont from './userSetUI/userSetUICont';

const UserProfile = ({ user, own }) => {
  const AppStateArr = useAppState(own ? 'myProfile' : '');
  const [appState, setAppState] = AppStateArr;
  const [alertProps, setAlert] = useAlert();
  const [dom, setDOM] = useState();
  useUserInfo((self) => {
    setAppState({ type: 'USER', id: self.id });
  });
  useScrollTrigger(
    (e) => {
      reloadPost(e, AppStateArr);
    },
    [AppStateArr]
  );
  console.log(user);
  return (
    <>
      <Head>
        <title>{`RafPost-${user ? user.username : ''}`}</title>
      </Head>
      <div
        ref={(e) => {
          setDOM(e);
        }}
      >
        <UserContext.Provider value={user}>
          <AppContext.Provider value={AppStateArr}>
            <ContContext.Provider value={dom}>
              <AlertContext.Provider value={setAlert}>
                <Alert props={alertProps} />
                <PostHandlerUI />
                {user ? <UserSetUICont user={user} /> : null}
                <div
                  className={
                    alertProps.state || appState.editPost.state || appState.userEdit ? 'freeze' : ''
                  }
                >
                  {appState.userid ? <TopBar /> : null}
                  {user ? (
                    <>
                      <ProfileCard />
                      <Title icon={<img src="/posts.svg" alt="posts" />} text="Posts" />
                      <Postlist type="user" user={user._id} />
                    </>
                  ) : (
                    <Error type="404" />
                  )}
                </div>
              </AlertContext.Provider>
            </ContContext.Provider>
          </AppContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default UserProfile;
