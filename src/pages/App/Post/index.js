/* eslint-disable consistent-return */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import AppContext from '../../../Contexts/AppContext';
import Alert from '../../components/alert';
import TopBar from '../components/topbar/topbar';
import Header from './components/header/header';
import NewPostForm from './components/newpost/newPostForm';
import Styles from './scss/postapp.module.scss';

const PostApp = () => {
  const Router = useRouter();
  const [appState, setAppState] = useState({
    name: 'post',
    description: 'Posting App Made by HRM Rafsan Amin',
    addPost: false,
  });
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '' });
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
      <div className={Styles.postAppWindow}>
        <Alert
          state={alert.state}
          header={alert.title}
          text={alert.desc}
          type={alert.type}
          setState={setAlert}
        />
        <AppContext.Provider value={{ state: appState, setState: setAppState, Alert: setAlert }}>
          <TopBar />
          <Header />
          {appState.addPost ? <NewPostForm /> : null}
        </AppContext.Provider>
      </div>
    </>
  );
};

export default PostApp;
