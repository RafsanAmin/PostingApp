import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import AlertContext from '../../../Contexts/AlertContext';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/userSetUICont.module.scss';
import Input from '../../Input';
import TextArea from '../../textarea';
import ProfilePicHandle from './profilePicHandle';

// pfp -> profilePic

const UserSetUICont = ({ user }) => {
  const [appState, setAppState] = useContext(AppContext);
  const Router = useRouter();
  const pfpState = useState(null);
  const [workplace, setWorkplace] = useState();
  const [birth, setBirth] = useState();
  const [Ebio, setBio] = useState();
  const [loading, setLoading] = useState(false);
  const close = () => {
    setAppState({ type: 'PF_0' });
  };
  const Alert = useContext(AlertContext);
  const setUserData = () => {
    const updateData = {
      work: workplace,
      bDay: birth,
      bio: Ebio,
      pfp: pfpState[0],
    };
    setLoading(true);
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
        Router.reload();
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
  };
  useEffect(() => {
    const { bio, bDay, work } = user;
    pfpState[1](null);
    setBio(bio);
    setBirth(bDay);
    setWorkplace(work);
  }, [appState.userEdit, user]);
  return (
    <div className={`${Styles.win} ${appState.userEdit ? Styles.on : Styles.off}`}>
      <div className={Styles.cont}>
        <div className={Styles.close}>
          <button type="button" onClick={close}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className={Styles.head}>
          <h3>User Details</h3>
        </div>
        <ProfilePicHandle styles={Styles} fileState={pfpState} />
        <div className={Styles.inputCont}>
          <span>Workplace</span>{' '}
          <Input
            value={workplace}
            setValue={setWorkplace}
            type="input"
            name="Workplace"
            limit="100"
          />
        </div>
        <div className={Styles.inputCont}>
          <span>Birthday</span>{' '}
          <Input
            style={{ cursor: 'pointer' }}
            value={birth}
            setValue={setBirth}
            plchold="Birthday"
            type="date"
          />
        </div>
        <div className={Styles.inputCont}>
          <span>Bio</span>
          <br />
          <TextArea
            limit={250}
            rows={{ min: 5, max: 5, lineH: 24 }}
            value={Ebio}
            setValue={setBio}
          />
        </div>

        <div className={`${Styles.updateButton} ${loading ? 'load' : ''}`}>
          <div />
          <button type="button" onClick={setUserData}>
            {loading ? <img src="/loadingW.svg" width="20" alt="" /> : null}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSetUICont;
