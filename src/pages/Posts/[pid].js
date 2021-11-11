import Head from 'next/head';
import postAPI from '../../API/PostsAPI';
import Alert from '../../components/alert';
import Error from '../../components/error';
import PHI from '../../components/postHandlerUI/postHandlerUI';
import PostCont from '../../components/posts/postCont';
import TopBar from '../../components/topbar/topbar';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, useAppState } from '../../hooks/useAppState';
import useUserInfo from '../../hooks/useUserInfo';
import Styles from '../../scss/postp.module.scss';

const postPage = ({ post, error }) => {
  const [alertProps, setAlert] = useAlert();
  const AppReducer = useAppState('PostSpecific');
  const [appState, setAppState] = AppReducer;
  useUserInfo(({ id }) => {
    setAppState({ type: 'USER', id });
  }, []);
  return (
    <>
      <Head>
        <title>Rafpost - PostSpecific</title>
      </Head>
      <AppContext.Provider value={AppReducer}>
        <TopBar />
        <div className={Styles.cont}>
          <Alert props={alertProps} />

          <PHI />
          <div className={alertProps.state || appState.editPost.state ? 'freeze' : ''}>
            <AlertContext.Provider value={setAlert}>
              {error ? <Error type={error.code} /> : <PostCont post={post} />}
            </AlertContext.Provider>
          </div>
        </div>
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
