import React, { useContext, useState } from 'react';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/userSetUICont.module.scss';
import UserSetUI from './userSetUI';

const userSetUICont = ({ user }) => {
  const [appState] = useContext(AppContext);
  const [userDataNVer, setuserDataNVer] = useState(false);

  return (
    <>
      {' '}
      <div className={`${Styles.win} ${appState.userEdit ? Styles.on : Styles.off}`}>
        <div className={Styles.cont}>
          {appState.userEdit ? (
            <div
              style={userDataNVer ? { transform: 'translateX(-50%)' } : null}
              className={Styles.roller}
            >
              <UserSetUI user={user} setVer={setuserDataNVer} />
            </div>
          ) : null}
        </div>
        <button style={{ zIndex: '50' }} type="button" onClick={() => setuserDataNVer((s) => !s)}>
          ++
        </button>
      </div>
    </>
  );
};

export default userSetUICont;
