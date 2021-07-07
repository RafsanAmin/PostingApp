/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserAuthenAPI from '../../../../../API/UserAuthen';

function Profile(props) {
  const [imgPath, setImgPath] = useState('/user.svg');
  const [toggle, setToggle] = useState(false);
  const { Styles } = props;
  const Router = useRouter();
  useEffect(() => {
    const xyz = async () => {
      try {
        const url = await UserAuthenAPI.getProfilePicPath();
        console.log(url);
        setImgPath(url);
      } catch {
        return 0;
      }
    };
    xyz();
  }, []);
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  const logout = async () => {
    const loggedout = await UserAuthenAPI.logout();
    if (loggedout) {
      Router.push('/');
    } else {
      window.location.reload();
    }
  };
  return (
    <div className={Styles.ProfileContainer} onClick={toggleMenu}>
      <img
        src={imgPath}
        style={{ borderRadius: '50%' }}
        onError={() => setImgPath('/user.svg')}
        width="40px"
        alt="profilePic"
      />
      <div className={`${Styles.ProfileMenu} ${toggle ? Styles.on : Styles.off}`} onClick={logout}>
        <div className={Styles.MenuItem}>
          <i className="fas fa-sign-in-alt" />
          <p>LogOut</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
