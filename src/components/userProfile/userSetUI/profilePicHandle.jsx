import React, { useContext, useRef, useState } from 'react';
import AlertContext from '../../../Contexts/AlertContext';
import UserContext from '../../../Contexts/UserContext';
import fileValidator from '../../../utils/fileValidator';

const ProfilePicHandle = ({ styles, State }) => {
  const { _id } = useContext(UserContext);
  const [hoverToggler, setHoverToggler] = useState(false);
  const [userData, setState] = State;

  const fileRef = useRef();
  const alertBox = useContext(AlertContext);
  const changeImage = async (e) => {
    try {
      const clearedFiles = await fileValidator(
        e.target.files,
        ['image/png', 'image/jpeg'],
        4,
        1,
        'File must have to be a .jpg or .png file'
      );
      setState({ type: 'SET_IMG', file: clearedFiles[0] });
    } catch (err) {
      alertBox({
        state: true,
        title: 'Error!',
        desc: err,
        type: 'error',
      });
    }
  };
  const deleteImage = async (e) => {
    e.stopPropagation();
    setState({ type: 'DEL_IMG' });
  };
  const imageLogic = (() => {
    const { pfp, delPFP } = userData;
    if (pfp && !delPFP) {
      return URL.createObjectURL(pfp);
    }
    if (!pfp && delPFP) {
      return `/uh/getProfilePic/wrong`;
    }

    return `/uh/getProfilePic/${_id}`;
  })();
  return (
    <div className={styles.pfp}>
      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={changeImage}
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
        <button className={styles.deleteBtn} type="button" onClick={deleteImage}>
          <i className="fas fa-times" />
        </button>
        <img src={imageLogic} alt="profile-pic" />
      </div>
    </div>
  );
};

export default ProfilePicHandle;
