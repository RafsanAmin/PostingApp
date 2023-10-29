import React, { useContext, useRef, useState } from 'react';
import AlertContext from '../../../Contexts/AlertContext';
import fileValidator from '../../../utils/fileValidator';
import FileDragHandler from '../../fileDragHandler/fileDragHandler';

const ProfilePicHandle = ({ styles, State }) => {
  const [hoverToggler, setHoverToggler] = useState(false);
  const [userData, setState] = State;
  const Alert = useContext(AlertContext);

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
    const { pfp, delPFP, _id } = userData;
    if (pfp && !delPFP) {
      return URL.createObjectURL(pfp);
    }
    if (!pfp && delPFP) {
      return `https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/wrong`;
    }

    return `https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${_id}`;
  })();
  return (
    <FileDragHandler
      className={styles.pfp}
      text="Drag Your Profile Image here!"
      handler={async (files) => {
        try {
          const clearedFiles = await fileValidator(
            files,
            ['image/png', 'image/jpeg'],
            4,
            1,
            'File must have to be a .jpg or .png file'
          );
          setState({ type: 'SET_IMG', file: clearedFiles[0] });
        } catch (err) {
          Alert({
            state: true,
            title: 'Error!',
            desc: err,
            type: 'error',
          });
        }
      }}
    >
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
    </FileDragHandler>
  );
};

export default ProfilePicHandle;
