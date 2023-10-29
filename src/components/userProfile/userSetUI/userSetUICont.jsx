import React, { useState } from 'react';
import Styles from '../../../scss/userSetUICont.module.scss';
import UserSetUI from './userSetUI';
import Verification from './verification';

const userSetUICont = ({ user }) => {
  const [userDataNVer, setuserDataNVer] = useState(null);

  return (
    <>
      {' '}
      <div className={Styles.cont}>
        <div
          style={userDataNVer ? { transform: 'translateX(-50%)' } : null}
          className={Styles.roller}
        >
          <UserSetUI user={user} setVer={setuserDataNVer} />
          <Verification userDataUp={[userDataNVer, setuserDataNVer]} />
        </div>
      </div>
    </>
  );
};

export default userSetUICont;
