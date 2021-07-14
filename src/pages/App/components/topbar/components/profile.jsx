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
      <div className={Styles.img}>
        <img src={imgPath} onError={() => setImgPath('/user.svg')} alt="profilePic" />
      </div>

      <div className={`${Styles.ProfileMenu} ${toggle ? Styles.on : Styles.off}`} onClick={logout}>
        <div className={Styles.MenuItem}>
          <i className="fas fa-sign-in-alt" />
          <p>LogOut</p>
        </div>
        <div className={Styles.MenuItem}>
          <i className="fas fa-info-circle" />
          <p>About</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
