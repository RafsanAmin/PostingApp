import UserAuthenAPI from '../../API/UserAuthen';
import UserProfile from '../../components/userProfile/userProfile';

UserProfile.getInitialProps = async ({ query }) => {
  const user = await UserAuthenAPI.getUserInfo(query.userid);
  return { user: user || { _id: null, bio: null, bDay: null, work: null } };
};
export default UserProfile;
