import { useEffect } from 'react';
import Alert from '../../components/alert';
import TopBar from '../../components/topbar/topbar';
import { AlertContext, useAlert } from '../../hooks/useAlert';
import { AppContext, useAppState } from '../../hooks/useAppState';

const UserProfile = ({ name }) => {
  const AppStateArr = useAppState('myProfile');
  const [, setAppState] = AppStateArr;
  const [alertProps, setAlert] = useAlert();
  useEffect(() => {
    setAppState({ type: 'USER', id: name });
  }, []);
  return (
    <>
      <AppContext.Provider value={AppStateArr}>
        <AlertContext.Provider value={setAlert}>
          <Alert props={alertProps} />
          <TopBar />
          <p>{name}</p>
        </AlertContext.Provider>
      </AppContext.Provider>
    </>
  );
};
UserProfile.getInitialProps = async ({ query }) => ({ name: query.userid });
export default UserProfile;
