/* eslint-disable consistent-return */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import PageInfoContext from '../../../Contexts/PageInfoContext';
import TopBar from '../components/topbar/topbar';

const pageInfo = {
  name: 'post',
  route: 'app/post',
  description: 'Posting App Made by HRM Rafsan Amin',
};
const PostApp = () => {
  const Router = useRouter();
  useEffect(() => {
    const authen = async () => {
      const status = await UserAuthenAPI.authen();
      if (status.done) {
        return 0;
      }
      Router.push('/Userauth/Login');
    };
    authen();
  });
  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      <div className="postapp-window">
        <PageInfoContext.Provider value={pageInfo}>
          <TopBar />
        </PageInfoContext.Provider>
      </div>
    </>
  );
};

export default PostApp;
