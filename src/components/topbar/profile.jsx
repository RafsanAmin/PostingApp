/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';

function Profile(props) {
  const [toggle, setToggle] = useState(false);
  const { Styles } = props;
  const Alerta = useContext(AlertContext);
  const [state] = useContext(AppContext);
  const Router = useRouter();
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  const lgoutConf = async () => {
    const loggedout = await UserAuthenAPI.logout();
    if (loggedout) {
      Router.push('/');
    } else {
      window.location.reload();
    }
  };
  const logout = async () => {
    Alerta({
      state: true,
      type: 'warn',
      title: 'Warning!',
      desc: 'Are you sure want to quit?',
      button: (
        <button type="button" onClick={lgoutConf}>
          Logout
        </button>
      ),
    });
  };

  const about = () => {
    Alerta({
      state: true,
      type: 'info',
      title: 'About',
      desc: (
        <>
          A Posting App Made by HRM Rafsan Amin (Me). <br />
          ** You can to github repo by{' '}
          <a href="https://github.com/RafsanAmin/PostingApp" target="_blank" rel="noreferrer">
            clicking this Link
          </a>
          .<br />
          ** You can also{' '}
          <a href="https://rafsanamin.epizy.com/" target="_blank" rel="noreferrer">
            click this Link
          </a>{' '}
          to visit my portfolio website.
        </>
      ),
    });
    setToggle(false);
  };
  return (
    <>
      {state.userid !== null ? (
        <div className={Styles.ProfileContainer}>
          <div className={Styles.img} onClick={toggleMenu}>
            <img src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${state.userid}`} alt="profilePic" />
          </div>

          <div className={`${Styles.ProfileMenu} ${toggle ? Styles.on : Styles.off}`}>
            <div className={Styles.MenuItem} onClick={logout}>
              <i className="fas fa-sign-in-alt" />
              <p>LogOut</p>
            </div>
            <div onClick={about} className={Styles.MenuItem}>
              <i className="fas fa-info-circle" />
              <p>About</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.ProfileContainer} />
      )}
    </>
  );
}

export default Profile;
