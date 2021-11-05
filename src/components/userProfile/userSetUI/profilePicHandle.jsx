import React, { useContext, useState } from 'react';
import UserContext from '../../../Contexts/UserContext';

const ProfilePicHandle = ({ styles }) => {
  const { _id } = useContext(UserContext);
  const [hoverToggler, setHoverToggler] = useState(false);
  return (
    <div className={styles.pfp}>
      <div className={styles.img}>
        {hoverToggler ? <span>Change Image</span> : null}
        <img
          onMouseEnter={() => setHoverToggler(true)}
          onMouseLeave={() => setHoverToggler(false)}
          src={`/uh/getProfilePic/${_id}`}
          alt="profile-pic"
        />
      </div>
    </div>
  );
};

export default ProfilePicHandle;
