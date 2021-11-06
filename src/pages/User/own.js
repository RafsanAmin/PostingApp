import { useEffect, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Error from '../../components/error';
import UserProfile from '../../components/userProfile/userProfile';

const UserProfileCont = () => {
  const [user, setUser] = useState({ _id: null, bio: null, bDay: null, work: null });
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
  return <>{error ? <Error type="401" /> : <UserProfile user={user} own />}</>;
};
export default UserProfileCont;
