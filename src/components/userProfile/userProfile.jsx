import Head from 'next/head';
import { useState } from 'react';
import ContContext from '../../Contexts/ContContext';
import UserContext from '../../Contexts/UserContext';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, reloadPost, useAppState } from '../../hooks/useAppState';
import { editContext as EditContext, useEditState } from '../../hooks/useEditState';
import useFreeze from '../../hooks/useFreeze';
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
  const [, setAppState] = AppStateArr;
  const EditStateArr = useEditState();
  const [editState] = EditStateArr;

  const [alertProps, setAlert] = useAlert();
  const [dom, setDOM] = useState();
  useFreeze(alertProps.state || editState.editPost.state || editState.userEdit, [
    alertProps.state,
    editState.editPost.state,
    editState.userEdit,
  ]);
  useUserInfo((self) => {
    setAppState({ type: 'USER', id: self.id });
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
        <title>{`RafPost-${user.username}`}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://rafpost.herokuapp.com" />
        <meta name="twitter:title" content={`RafPost-${user.username}`} />
        <meta name="twitter:description" content={user.bio} />
        <meta name="twitter:creator" content="@RafsanAmin" />
        <meta
          property="twitter:image"
          content={`https://rafpost.herokuapp.comhttps://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${user._id}`}
        />
        <meta property="og:type" content="og:description" />
        <meta property="og:title" content={`RafPost-${user.username}`} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:site_name" content="RafPost" />
        <meta property="og:url" content="https://rafpost.herokuapp.com" />
        <meta
          property="og:image"
          content={`https://rafpost.herokuapp.comhttps://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${user._id}`}
        />
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
                <EditContext.Provider value={EditStateArr}>
                  <Alert props={alertProps} />
                  <div className={`${alertProps.state ? 'freeze' : ''}`}>
                    <PostHandlerUI />
                    <UserSetUICont user={user} />
                  </div>
                  <div
                    className={
                      alertProps.state || editState.editPost.state || editState.userEdit
                        ? 'freeze'
                        : ''
                    }
                  >
                    <TopBar />
                    {user._id ? (
                      <>
                        <ProfileCard />
                        <Title icon={<img src="/posts.svg" alt="posts" />} text="Posts" />
                        <Postlist type="user" user={user._id} />
                      </>
                    ) : (
                      <>{!own ? <Error type="404" /> : null}</>
                    )}
                  </div>{' '}
                </EditContext.Provider>
              </AlertContext.Provider>
            </ContContext.Provider>
          </AppContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default UserProfile;
