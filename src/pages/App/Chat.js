import Head from 'next/head';
import { useState } from 'react';
import Alert from '../../components/alert';
import TopBar from '../../components/topbar/topbar';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';

const pageInfo = {
  name: 'chat',
  route: 'app/chat',
  description: 'Posting App Made by HRM Rafsan Amin',
};
const tempstyle = {
  cont: { position: 'relative', height: '100vh' },
  head: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: '600',
    fontFamily: 'ubuntu, arial',
    textAlign: 'Center',
  },
};
const ChatApp = () => {
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '' });
  return (
    <>
      <Head>
        <title>Rafpost- ChatApp</title>
      </Head>
      <div style={tempstyle.cont} className="chatapp-window">
        <Alert
          state={alert.state}
          header={alert.title}
          text={alert.desc}
          type={alert.type}
          setState={setAlert}
          cIcon={alert.cIcon || false}
        />
        <AppContext.Provider value={[pageInfo]}>
          <AlertContext.Provider value={setAlert}>
            <h1 style={tempstyle.head}>Feature isnt Available</h1>
            <TopBar />
          </AlertContext.Provider>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default ChatApp;
