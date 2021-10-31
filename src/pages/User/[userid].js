import Head from 'next/head';
import { useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Alert from '../../components/alert';
import Error from '../../components/error';
import PostHandlerUI from '../../components/postHandlerUI/postHandlerUI';
import Postlist from '../../components/posts/postlist';
import ProfileCard from '../../components/profile/profileCard';
import Title from '../../components/title';
import TopBar from '../../components/topbar/topbar';
import UserSetUICont from '../../components/userSetUI/userSetUICont';
import ContContext from '../../Contexts/ContContext';
import UserContext from '../../Contexts/UserContext';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, reloadPost, useAppState } from '../../hooks/useAppState';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import useUserInfo from '../../hooks/useUserInfo';

const UserProfile = ({ user }) => {
  const AppStateArr = useAppState('myProfile');
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
                <UserSetUICont />
                <PostHandlerUI />
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
UserProfile.getInitialProps = async ({ query }) => {
  const user = await UserAuthenAPI.getUserInfo(query.userid);
  return { user };
};
export default UserProfile;
