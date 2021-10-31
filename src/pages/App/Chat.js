import Head from 'next/head';
import Alert from '../../components/alert';
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
  return (
    <>
      <Head>
        <title>Rafpost- ChatApp</title>
      </Head>
      <div style={tempstyle.cont} className="chatapp-window">
        <Alert props={alertProp} />
        <AppContext.Provider value={[appState]}>
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
