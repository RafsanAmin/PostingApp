import React, { useContext, useRef, useState } from 'react';
import UserContext from '../../../Contexts/UserContext';

const ProfilePicHandle = ({ styles, fileState }) => {
  const { _id } = useContext(UserContext);
  const [hoverToggler, setHoverToggler] = useState(false);
  const [state, setState] = fileState;
  const fileRef = useRef();
  return (
    <div className={styles.pfp}>
      <input ref={fileRef} type="file" hidden onChange={(e) => setState(e.target.files[0])} />
      <div
        onMouseEnter={() => setHoverToggler(true)}
        onMouseLeave={() => setHoverToggler(false)}
        onClick={() => fileRef.current.click()}
        className={styles.img}
      >
        {hoverToggler ? (
          <span>
            <i className="fas fa-file-image" />
            {`  `}
            Change Image
          </span>
        ) : null}
        <img
          src={state ? URL.createObjectURL(state) : `/uh/getProfilePic/${_id}`}
          alt="profile-pic"
        />
      </div>
    </div>
  );
};

export default ProfilePicHandle;
