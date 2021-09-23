import Head from 'next/head';
import postAPI from '../../API/PostsAPI';
import Alert from '../../components/alert';
import PostCont from '../../components/posts/postCont';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import Styles from '../../scss/postp.module.scss';

const postPage = ({ post, error }) => {
  const [alertProps, setAlert] = useAlert();
  return (
    <>
      <Head>
        <title>Rafpost - PostSpecific</title>
      </Head>
      <div className={Styles.cont}>
        <Alert props={alertProps} />
        <AlertContext.Provider value={setAlert}>
          {error ? (
            <div className={Styles.error}>
              <h1>{error.code}</h1>
              {error.massage}
            </div>
          ) : (
            <PostCont post={post} />
          )}
        </AlertContext.Provider>
      </div>
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
