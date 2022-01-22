import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import AlertContext from '../../../Contexts/AlertContext';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/userSetUICont.module.scss';
import fileValidator from '../../../utils/fileValidator';
import Checkbox from '../../checkbox';
import FileDragHandler from '../../fileDragHandler/fileDragHandler';
import Input from '../../Input';
import TextArea from '../../textarea';
import ProfilePicHandle from './profilePicHandle';
// pfp -> profilePic

const initialState = {
  work: '',
  bDay: '',
  bio: '',
  pfp: null,
  delPFP: false,
  verification: false,
  username: '',
  email: '',
  pass: '',
  confPass: '',
  id: null,
  verificationCode: '',
  userGivenCode: '',
};
const UserSetUI = ({ user, setVer }) => {
  const [appState, setAppState] = useContext(AppContext);
  const Router = useRouter();

  const [userDetail, dispatchUserDetail] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.text };
      case 'SET_IMG':
        return { ...state, pfp: action.file, delPFP: false };
      case 'DEL_IMG':
        return { ...state, pfp: null, delPFP: true };
      case 'ID':
        return { ...state, id: action.id };
      case 'CLOSE':
        return initialState;
      case 'INIT':
        return { ...state, ...action.data, pfp: null };
      case 'SET_VERF':
        return { ...state, verificationCode: action.code };
      default:
        return state;
    }
  }, initialState);
  const setF = (f, t) => {
    dispatchUserDetail({ type: 'SET_FIELD', field: f, text: t });
  };
  const [loading, setLoading] = useState(false);

  const close = () => {
    setAppState({ type: 'PF_0' });
    dispatchUserDetail({ type: 'CLOSE' });
  };
  const Alert = useContext(AlertContext);
  const setUserData = () => {
    const { work, bDay, bio, pfp, delPFP, verification, username, email, pass, confPass, id } =
      userDetail;
    const updateData = {
      work: work?.trim() || '',
      bDay: bDay?.trim() || '',
      bio: bio?.trim() || '',
      pfp,
      delPFP,
      verification,
      username: username?.trim() && username === user.username ? null : username,
      email: email?.trim() || '',
      pass: pass?.trim() || null,
      confPass: confPass?.trim() || null,
      id,
    };
    setLoading(true);
    if (verification) {
      UserAuthenAPI.verifyForUpdateData(updateData)
        .then((code) => {
          dispatchUserDetail({ type: 'SET_VERF', code });
          setVer({ ...updateData, code });
          setLoading(false);
        })
        .catch((err) => {
          Alert({
            state: true,
            title: 'Error!',
            desc: err,
            type: 'error',
          });
          setLoading(false);
        });
    } else {
      UserAuthenAPI.updateUserDataNoVer(updateData)
        .then((msg) => {
          Alert({
            state: true,
            title: 'Successfull!',
            desc: msg,
            type: 'success',
          });
          setLoading(false);
          close();
          setTimeout(() => Router.reload(), 5000);
        })
        .catch((err) => {
          Alert({
            state: true,
            title: 'Error!',
            desc: err,
            type: 'error',
          });
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    const { _id } = user;
    console.log(user);
    dispatchUserDetail({
      type: 'INIT',
      data: {
        ...user,
        id: _id,
      },
    });
  }, [appState.userEdit, user]);
  return (
    <FileDragHandler
      className={Styles.userSetUI}
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
          dispatchUserDetail({ type: 'SET_IMG', file: clearedFiles[0] });
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
      <div className={Styles.close}>
        <button type="button" onClick={close}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className={Styles.head}>
        <h3>User Details</h3>
      </div>
      <ProfilePicHandle styles={Styles} State={[userDetail, dispatchUserDetail]} />
      <div className={Styles.grid}>
        <div className={Styles.inputCont}>
          <span>Workplace</span>{' '}
          <Input
            value={userDetail.work}
            setValue={(d) => {
              setF('work', d);
            }}
            type="input"
            name="Workplace"
            limit="100"
          />
        </div>

        <div className={Styles.inputCont}>
          <span>Birthday</span>{' '}
          <Input
            style={{ cursor: 'pointer' }}
            value={userDetail.bDay}
            setValue={(d) => setF('bDay', d)}
            plchold="Birthday"
            type="date"
          />
        </div>
        <br />
        <div className={`${Styles.inputCont} ${Styles.fullLine}`}>
          <span>Bio</span>
          <br />
          <TextArea
            limit={250}
            rows={{ min: 5, max: 5, lineH: 24 }}
            value={userDetail.bio}
            setValue={(d) => setF('bio', d)}
          />
        </div>
        <span>
          <h4>
            <i className="fas fa-exclamation-triangle    " /> YOU NEED VERIFICATION FOR SOME
            SETTINGS.
          </h4>
          <Checkbox
            state={userDetail.verification}
            setState={(d) => setF('verification', d)}
            label="So to update those data with verification, check the
              Checkbox. Your verification mail will be sent to new mail address given by you."
          />
        </span>

        {userDetail.verification ? (
          <>
            {' '}
            <div className={Styles.inputCont}>
              <span>Username</span>{' '}
              <Input
                value={userDetail.username}
                setValue={(d) => setF('username', d)}
                plchold="Username"
                type="text"
                limit="64"
              />
            </div>
            <div className={Styles.inputCont}>
              <span>E-mail</span>{' '}
              <Input
                value={userDetail.email}
                setValue={(d) => setF('email', d)}
                type="input"
                name="E-mail"
                limit="64"
              />
            </div>
            <div className={Styles.inputCont}>
              <span>New Password</span>{' '}
              <Input
                value={userDetail.pass}
                setValue={(d) => setF('pass', d)}
                type="password"
                name="Keep Blank if you don't want to change"
                limit="64"
              />
            </div>
            <div className={Styles.inputCont}>
              <span>Confirm New Password</span>{' '}
              <Input
                value={userDetail.confPass}
                setValue={(d) => setF('confPass', d)}
                type="password"
                name="Re-write your whole password here"
                limit="64"
              />
            </div>{' '}
          </>
        ) : null}
      </div>

      <br />
      <div className={`${Styles.updateButton} ${loading ? 'load' : ''}`}>
        <div />
        <button type="button" onClick={setUserData}>
          {loading ? <img src="/loadingW.svg" width="20" alt="" /> : null}
          {userDetail.verification ? 'Verify' : 'Update without verification'}
        </button>
      </div>
    </FileDragHandler>
  );
};

export default UserSetUI;
