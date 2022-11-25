import React, { useContext } from 'react';
import urlPrefix from '../../../API/getURL';
import AlertContext from '../../../Contexts/AlertContext';
import AppContext from '../../../Contexts/AppContext';
import UserContext from '../../../Contexts/UserContext';
import Clipboard from '../../clipboard';
import { Item, Menu, MenuCont } from '../../menu';

const Profile = ({ Styles }) => {
  const user = useContext(UserContext);
  const Alert = useContext(AlertContext);
  const [appstate, setAppState] = useContext(AppContext);
  const { userid } = appstate;
  const own =
    userid === user._id ||
    userid === '61346cba5f69790468c69b2d' ||
    userid === '614ca3dadca93a001614286a';
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
  const editHandler = () => {
    setAppState({ type: 'UE_1' });
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
        </div>
        <div className={Styles.menu}>
          <MenuCont>
            <Menu>
              <Item icon={<i className="fas fa-share" />} name="Share" handler={shareHandler} />
              {own ? (
                <Item icon={<i className="fas fa-edit" />} name="Edit" handler={editHandler} />
              ) : null}
            </Menu>
          </MenuCont>
        </div>
        <div />
      </div>
    </section>
  );
};

export default Profile;
