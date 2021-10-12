/* sfeslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import UserAuthenAPI from '../../API/UserAuthen';
import Checkbox from '../checkbox';
import Input from '../Input';
import Loading from '../Loading';

function Login(props) {
  const { sui, alertBox } = props;
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [remMe, setRemMe] = useState(true);
  const [imgPath, setImgPath] = useState('');
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
        profilePic: fileRef.current.files[0],
        confPass: ConfirmPassword,
      };
      console.log(UserInfo);
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
  const fileSet = () => {
    const { length } = fileRef.current.files;

    if (length !== 0) {
      const { size, type } = fileRef.current.files[0];
      console.log(fileRef.current.files[0]);

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
        setImgPath(URL.createObjectURL(fileRef.current.files[0]));
      }
    }
  };
  return (
    <>
      <Loading classP="signup" contClass="signup-form" loadState={loading}>
        <div className="supp">
          <div className="signup-head">
            <h1>SignUp</h1>
          </div>
          <div onClick={uploadClick} className="signup-fieldFile file">
            <input
              type="file"
              ref={fileRef}
              name="profile-pic"
              onChange={fileSet}
              hidden
              accept="image/jpeg, image/png"
            />
            <img src={imgPath !== '' ? imgPath : '/user.svg'} alt="p" />
            <div className="text">
              <h3>Click Here to Upload Profile Pic</h3>
              <p>File Size Limit is 1 MB & Only *.jpg and *.png files are allowed</p>
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
            <Link href="/Userauth/Login">
              <button type="button">Have Account? Login</button>
            </Link>
          </div>
        </div>
      </Loading>
    </>
  );
}

export default Login;
