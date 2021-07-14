import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserAuthenAPI from '../../../../API/UserAuthen';
import Input from '../../../components/Input';
import Loading from '../../../components/Loading';

const Verify = (props) => {
  const { uinf, sui, alertBox } = props;
  const [verCode, setVerCode] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  useEffect(() => {
    setStatus(verCode === (uinf ? uinf.code : ''));
  }, [uinf, verCode]);
  const signin = async () => {
    setLoading(true);
    try {
      const x = await UserAuthenAPI.signUp(uinf);
      setStatus({ success: true, massage: x.massage });
      alertBox({ state: true, title: 'Signup Successful!', desc: x.massage, type: 'success' });
      setTimeout(() => {
        Router.push('/Userauth/Login');
      }, 3000);
      setLoading(false);
    } catch (err) {
      setStatus({ massage: err.data.massage });
      alertBox({ state: true, title: 'Error!', desc: err.data.massage, type: 'error' });
      setLoading(false);
    }
  };
  useEffect(() => {
    const listen = (e) => {
      if (e.which === 13) {
        signin();
      }
    };
    document.addEventListener('keypress', listen);
    return () => {
      document.removeEventListener('keypress', listen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verCode]);
  return (
    <>
      <Loading classP="verify" contClass="signup-verify" loadState={loading}>
        <div className="supp">
          <div className="gb">
            <button
              type="button"
              onClick={() => {
                sui(null);
              }}
            >
              {' '}
              <i className="fas fa-arrow-left " />
              Go Back
            </button>
          </div>

          <div className="signup-head signup-form">
            <h1>Verify</h1>
          </div>
          <div className="verify-text">
            <p>
              A Email with 7-Digit Verfication Code has been sent to{' '}
              <span style={{ fontWeight: '600' }}>{uinf ? uinf.eml : 'Cannot Be Sent'}</span>. Get
              The Verification Code And Submit it below. At any problem click on Go Back button.
            </p>
          </div>
          <Input
            type="text"
            name="Enter The Code"
            value={verCode}
            setValue={setVerCode}
            classP="verify"
          />
          <div className="buttons">
            <button type="button" disabled={!status} onClick={signin}>
              Verify
            </button>
          </div>
        </div>
      </Loading>
    </>
  );
};

export default Verify;
