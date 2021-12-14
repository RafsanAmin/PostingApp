import React, { useContext, useRef, useState } from 'react';
import AlertContext from '../../../Contexts/AlertContext';
import UserContext from '../../../Contexts/UserContext';
import fileValidator from '../../../utils/fileValidator';

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
        onChange={async (e) => {
          try {
            const clearedFiles = await fileValidator(
              e.target.files,
              ['image/png', 'image/jpeg'],
              4,
              1,
              'File must have to be a .jpg or .png file'
            );
            setState(clearedFiles[0]);
          } catch (err) {
            alertBox({
              state: true,
              title: 'Error!',
              desc: err,
              type: 'error',
            });
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
