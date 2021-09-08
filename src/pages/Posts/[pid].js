import Head from 'next/head';
import { useState } from 'react';
import postAPI from '../../API/PostsAPI';
import Alert from '../../components/alert';
import PostCont from '../../components/posts/postCont';
import AlertContext from '../../Contexts/AlertContext';
import Styles from '../../scss/postp.module.scss';

const postPage = ({ post, error }) => {
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '' });
  return (
    <>
      <Head>
        <title>Rafpost - PostSpecific</title>
      </Head>
      <div className={Styles.cont}>
        <Alert
          state={alert.state}
          header={alert.title}
          text={alert.desc}
          type={alert.type}
          setState={setAlert}
          cIcon={alert.cIcon || false}
        />
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
