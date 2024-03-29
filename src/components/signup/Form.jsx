/* sfeslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import fileValidator from '../../utils/fileValidator';
import Input from '../Input';
import Loading from '../Loading';
import Checkbox from '../checkbox';
import FileDragHandler from '../fileDragHandler/fileDragHandler';

function Login(props) {
  const { sui, alertBox } = props;
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [remMe, setRemMe] = useState(true);
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const remMeLabel = 'Remember that You have to verify via Email to SignUp. Do You Agree ?';

  const setSignUP = async () => {
    setLoading(true);
    try {
      const UserInfo = {
        user: User,
        pass: Pass,
        eml: Email,
        profilePic: img,
        confPass: ConfirmPassword,
      };

      const verficationCode = await UserAuthenAPI.verifyMail(UserInfo);
      sui({ ...UserInfo, code: verficationCode.verification });
      setLoading(false);
    } catch (err) {
      alertBox({
        state: true,
        title: 'Error!',
        desc: err.data.massage,
        type: 'error',
      });
      setLoading(false);
    }
  };
  const uploadClick = () => {
    fileRef.current.click();
  };
  const fileSet = async (files) => {
    try {
      const clearedFiles = await fileValidator(
        files,
        ['image/png', 'image/jpeg'],
        4,
        1,
        'File must have to be a .jpg or .png file'
      );

      setImg(clearedFiles[0]);
    } catch (err) {
      alertBox({
        state: true,
        title: 'Error!',
        desc: err,
        type: 'error',
      });
    }
  };
  return (
    <>
      <Loading classP="signup" contClass="signup-form" loadState={loading}>
        <FileDragHandler className="supp" text="Drag Your Profile Picture Here!" handler={fileSet}>
          <div className="signup-head">
            <h1>SignUp</h1>
          </div>
          <div onClick={uploadClick} className="signup-fieldFile file">
            <input
              type="file"
              ref={fileRef}
              name="profile-pic"
              onChange={(e) => fileSet(e.target.files)}
              hidden
              accept="image/jpeg, image/png"
            />
            <img src={img ? URL.createObjectURL(img) : '/user.svg'} alt="p" />
            <div className="text">
              <h3>Click Here to Upload Profile Pic</h3>
              <p>File Size Limit is 4 MB & Only *.jpg and *.png files are allowed</p>
            </div>
          </div>
          <div className="signup-field-group">
            <div className="signup-field-sub">
              <span>Username & Email</span>
              <div>
                <Input
                  type="text"
                  name="Username"
                  value={User}
                  setValue={setUser}
                  classP="signup"
                />
                <Input type="text" name="Email" value={Email} setValue={setEmail} classP="signup" />
              </div>
            </div>
            <div className="signup-field-sub">
              <span>Password</span>
              <div>
                <Input
                  type="password"
                  name="Password"
                  value={Pass}
                  setValue={setPass}
                  classP="signup"
                />
                <Input
                  type="password"
                  name="Confirm Password"
                  value={ConfirmPassword}
                  setValue={setConfirmPassword}
                  classP="signup"
                />
              </div>
            </div>
          </div>
          <div className="signup-remme">
            <Checkbox setState={setRemMe} state={remMe} label={remMeLabel} />
          </div>
          <div className="buttons">
            <button disabled={!remMe} className="Signup" type="button" onClick={setSignUP}>
              SignUp
            </button>
          </div>
          <div className="signup-foot">
            <Link href="/">
              <button type="button">Have Account? Login</button>
            </Link>
          </div>
        </FileDragHandler>
      </Loading>
    </>
  );
}

export default Login;
