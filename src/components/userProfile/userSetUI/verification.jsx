import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import UserAuthenAPI from '../../../API/UserAuthen';
import AlertContext from '../../../Contexts/AlertContext';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/userSetUICont.module.scss';
import Input from '../../Input';

const Verification = ({ userDataUp }) => {
  const [, setAppState] = useContext(AppContext);
  const Router = useRouter();
  const [userData, setUserData] = userDataUp;
  const [verCode, setVerCode] = useState('');
  const Alert = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const submit = () => {
    if (verCode === userData?.code) {
      setLoading(true);
      UserAuthenAPI.updateUserDataWithVer(userData)
        .then((res) => {
          Alert({
            state: true,
            title: 'Successfull!',
            type: 'success',
            desc: res,
          });
          setLoading(false);
          setAppState({ type: 'PF_0' });
          setUserData(null);
          setTimeout(() => {
            Router.reload();
          }, 5000);
        })
        .catch((err) => {
          Alert({
            state: true,
            title: 'Error',
            type: 'error',
            desc: err.toString(),
          });
          setLoading(false);
        });
    } else {
      Alert({
        state: true,
        title: 'Error',
        type: 'error',
        desc: "Code aren't Same",
      });
    }
  };
  return (
    <div className={Styles.verCont}>
      <div className={Styles.close}>
        <button
          type="button"
          onClick={() => {
            setAppState({ type: 'PF_0' });
            setUserData(null);
          }}
        >
          <i className="fas fa-times" />
        </button>
      </div>
      <div className={Styles.inner}>
        <div className={Styles.title}>
          <h3>Verify</h3>
          <p>
            An email has been send to <b>{userData?.email || 'ooo'}</b> with verfication code.
            Submit the code below and update your data.
          </p>
        </div>

        <Input value={verCode} setValue={setVerCode} type="text" limit="6" />
      </div>

      <div className={`${Styles.updateButton} ${loading ? Styles.load : ''}`}>
        <button type="button" onClick={submit} disabled={verCode !== userData?.code}>
          {loading ? <img src="/loadingW.svg" width="20" alt="" /> : null}
          Update Data
        </button>
      </div>
    </div>
  );
};

export default Verification;
