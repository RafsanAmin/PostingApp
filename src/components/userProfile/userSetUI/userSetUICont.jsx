import React, { useContext, useState } from 'react';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/userSetUICont.module.scss';
import UserSetUI from './userSetUI';
import Verification from './verification';

const userSetUICont = ({ user }) => {
  const [appState] = useContext(AppContext);
  const [userDataNVer, setuserDataNVer] = useState(null);

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
              <Verification userDataUp={[userDataNVer, setuserDataNVer]} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default userSetUICont;
