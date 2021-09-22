import { useEffect, useReducer, useState } from 'react';
import Alert from '../../components/alert';
import TopBar from '../../components/topbar/topbar';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import { AppReducer, initalization } from '../../state/postAppState';

const UserProfile = ({ name }) => {
  const [appState, setAppState] = useReducer(AppReducer, initalization('myProfile'));
  const [alert, setAlert] = useState({ state: false, title: '', desc: '', type: '', button: null });
  const [context, setContext] = useState([appState, setAppState]);
  useEffect(() => {
    setAppState({ type: 'USER', id: name });
  }, []);
  useEffect(() => {
    setContext([appState, setAppState]);
  }, [appState]);
  return (
    <>
      <AppContext.Provider value={context}>
        <AlertContext.Provider value={alert}>
          <Alert
            state={alert.state}
            header={alert.title}
            text={alert.desc}
            type={alert.type}
            setState={setAlert}
            button={alert.button}
            cIcon={alert.cIcon || false}
          />
          <TopBar />
          <p>{name}</p>
        </AlertContext.Provider>
      </AppContext.Provider>
    </>
  );
};
UserProfile.getInitialProps = async ({ query }) => ({ name: query.userid });
export default UserProfile;
