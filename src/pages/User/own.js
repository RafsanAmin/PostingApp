import { useEffect, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Error from '../../components/error';
import UserProfile from '../../components/userProfile/userProfile';

const UserProfileCont = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const main = async () => {
      try {
        const userInfo = await UserAuthenAPI.getOwnInfo();
        setUser(userInfo);
      } catch {
        setError(true);
      }
    };
    main();
  }, []);
  return <>{error ? <Error type="400" /> : <UserProfile user={user} own />}</>;
};
export default UserProfileCont;
