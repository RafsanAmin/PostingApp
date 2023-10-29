import React, { useContext } from 'react';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/profilecard.module.scss';
import Clipboard from '../clipboard';
import { Item, Menu, MenuCont } from '../menu';

const Profile = () => {
  const [App] = useContext(AppContext);
  const Alert = useContext(AlertContext);
  // const own =
  //   userid === user._id ||
  //   userid === '61346cba5f69790468c69b2d' ||
  //   userid === '614ca3dadca93a001614286a';
  const shareHandler = () => {
    Alert({
      state: true,
      type: 'info',
      title: 'Share',
      desc: (
        <>
          Share this ID so that your friend can join in this group.
          <Clipboard copyText={`${App.grpInfo._id}`} />
        </>
      ),
      cIcon: <i className="fas fa-share" />,
    });
  };
  return (
    <section className={Styles.profileCont}>
      <div className={Styles.inner}>
        <div className={Styles.profileImg}>
          <img
            src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${App.grpInfo._id}`}
            alt="profile-pic"
          />
        </div>
        <div className={Styles.usrname}>
          <h1>{App.grpInfo.name}</h1>
          <div className={Styles.menu}>
            <MenuCont>
              <Menu>
                <Item icon={<i className="fas fa-share" />} name="Share" handler={shareHandler} />
              </Menu>
            </MenuCont>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};

export default Profile;
