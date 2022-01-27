import React, { useEffect, useState } from 'react';
import Alert from '../../components/alert';
import PassChange from '../../components/PasswordChange/passChange';
import Validationconfirm from '../../components/PasswordChange/validationconfirm';
import Validationform from '../../components/PasswordChange/validationform';
import { useAlert } from '../../hooks/useAlert';
import Styles from '../../scss/passwordchange.module.scss';

const Passwordchange = () => {
  const [pageState, setPageState] = useState();
  const [alertProp, setAlert] = useAlert();
  useEffect(() => {
    setAlert({
      state: true,
      type: 'warn',
      title: 'Wait!',
      desc: 'This page in now on construction',
    });
  }, []);
  return (
    <div className={Styles.win}>
      <Alert props={alertProp} />
      <div className={Styles.cont}>
        <div className={Styles.roller}>
          <Validationform />
          <Validationconfirm />
          <PassChange />
        </div>
      </div>
    </div>
  );
};

export default Passwordchange;
