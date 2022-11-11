import Head from 'next/head';
import { useEffect } from 'react';
import io from 'socket.io-client';
import Alert from '../../components/alert';
import Cont from '../../components/chatapp/cont';
import TopBar from '../../components/topbar/topbar';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, useAppState } from '../../hooks/useAppState';
import useUserInfo from '../../hooks/useUserInfo';

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
  const [alertProp, setAlert] = useAlert();
  const [appState, setAppState] = useAppState('chat');
  useUserInfo(({ id }) => {
    setAppState({ type: 'USER', id });
  }, []);
  useEffect(() => {
    const socket = io('/');
    socket.emit('join-room', 'Test');
    socket.on('resp', (msg) => {
      console.log(msg);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Rafpost- ChatApp</title>
      </Head>
      <div style={tempstyle.cont} className="chatapp-window">
        <Alert props={alertProp} />
        <AppContext.Provider value={[appState]}>
          <AlertContext.Provider value={setAlert}>
            <TopBar />
            <Cont />
          </AlertContext.Provider>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default ChatApp;
