import Head from 'next/head';
import postAPI from '../../API/PostsAPI';
import Alert from '../../components/alert';
import Error from '../../components/error';
import PHI from '../../components/postHandlerUI/postHandlerUI';
import PostCont from '../../components/posts/postCont';
import TopBar from '../../components/topbar/topbar';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, useAppState } from '../../hooks/useAppState';
import { editContext as EditContext, useEditState } from '../../hooks/useEditState';
import useUserInfo from '../../hooks/useUserInfo';
import Styles from '../../scss/postp.module.scss';

const postPage = ({ post, error }) => {
  const [alertProps, setAlert] = useAlert();
  const AppReducer = useAppState('PostSpecific');
  const [appState, setAppState] = AppReducer;
  const EditStateArr = useEditState();

  useUserInfo(({ id }) => {
    setAppState({ type: 'USER', id });
  }, []);
  return (
    <>
      <Head>
        <title>Rafpost - PostSpecific</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://rafpost.herokuapp.com" />
        <meta name="twitter:title" content="Rafpost - PostSpecific" />
        <meta name="twitter:description" content={post.text} />
        <meta name="twitter:creator" content="@RafsanAmin" />
        <meta property="twitter:image" content="https://rafpost.herokuapp.com/icon_192.png" />
        <meta property="og:type" content="og:description" />
        <meta property="og:title" content="RafPost-PostSpecific" />
        <meta property="og:description" content={post.text} />
        <meta property="og:site_name" content="RafPost" />
        <meta property="og:url" content="https://rafpost.herokuapp.com" />
        <meta property="og:image" content="https://rafpost.herokuapp.com/icon_192.png" />
      </Head>
      <AppContext.Provider value={AppReducer}>
        <EditContext.Provider value={EditStateArr}>
          <AlertContext.Provider value={setAlert}>
            <TopBar />
            <div className={Styles.cont}>
              <Alert props={alertProps} />
              <div className={`${alertProps.state ? 'freeze' : ''}`}>
                {' '}
                <PHI />
              </div>
              <div className={alertProps.state || EditStateArr[0].editPost.state ? 'freeze' : ''}>
                {error ? <Error type={error.code} /> : <PostCont post={post} />}
              </div>
            </div>
          </AlertContext.Provider>
        </EditContext.Provider>
      </AppContext.Provider>
    </>
  );
};
postPage.getInitialProps = async ({ query }) => {
  try {
    const post = await postAPI.getPostById(query.pid);
    return { post, error: false };
  } catch (error) {
    return { error, post: null };
  }
};
export default postPage;
