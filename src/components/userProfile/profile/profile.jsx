import React, { useContext } from 'react';
import urlPrefix from '../../../API/getURL';
import AlertContext from '../../../Contexts/AlertContext';
import UserContext from '../../../Contexts/UserContext';
import Styles from '../../../scss/profilecard.module.scss';
import Clipboard from '../../clipboard';
import { Item, Menu, MenuCont } from '../../menu';

const Profile = () => {
  const user = useContext(UserContext);
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
          Click the button right to copy link for sharing
          <Clipboard copyText={`${urlPrefix}/User/${user._id}`} />
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
            src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${user._id}`}
            alt="profile-pic"
          />
        </div>
        <div className={Styles.usrname}>
          <h1>{user.username}</h1>
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
