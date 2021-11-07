import React, { useContext, useRef, useState } from 'react';
import AlertContext from '../../../Contexts/AlertContext';
import UserContext from '../../../Contexts/UserContext';

const ProfilePicHandle = ({ styles, fileState }) => {
  const { _id } = useContext(UserContext);
  const [hoverToggler, setHoverToggler] = useState(false);
  const [state, setState] = fileState;
  const fileRef = useRef();
  const alertBox = useContext(AlertContext);
  return (
    <div className={styles.pfp}>
      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={(e) => {
          const { size, type } = e.target.files[0];
          if (type !== 'image/png' && type !== 'image/jpeg') {
            alertBox({
              state: true,
              title: 'Error!',
              desc: 'File must have to be a .jpg or .png file',
              type: 'error',
            });
          } else if (size > 1000000) {
            alertBox({
              state: true,
              title: 'Error!',
              desc: 'File Must Be Less than 1MB',
              type: 'error',
            });
          } else {
            setState(e.target.files[0]);
          }
        }}
        accept="image/jpeg, image/png"
      />
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
