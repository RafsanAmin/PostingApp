import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserAuthenAPI from '../API/UserAuthen';
import UserProfile from '../components/userProfile/userProfile';

const UserProfileCont = () => {
  const [user, setUser] = useState({ _id: null, bio: null, bDay: null, work: null });
  const Router = useRouter();

  useEffect(() => {
    const main = async () => {
      try {
        const userInfo = await UserAuthenAPI.getOwnInfo();
        setUser(userInfo);
      } catch {
        Router.push('/');
      }
    };
    main();
  }, []);
  return (
    <>
      <UserProfile user={user} setUser={setUser} own />
    </>
  );
};
export default UserProfileCont;
