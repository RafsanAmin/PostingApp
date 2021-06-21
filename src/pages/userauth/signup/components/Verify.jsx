import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserAuthenAPI from '../../../../API/UserAuthen';
import Input from '../../../UI-COMPS/Input';

const Verify = (props) => {
  const { uinf, sui } = props;
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
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        Router.push('/userauth/login');
      }, 3000);
      setLoading(false);
    } catch (err) {
      setStatus({ massage: err.data.massage });
      setLoading(false);
    }
  };
  return (
    <>
      <div className={`${loading ? 'loading-cont verify-load-cont' : ''}`} />
      <div className={`signup-verify${loading ? ' loading' : ''}`}>
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
          <p className={status.success ? 'succ' : 'failed'}>
            {status.success ? <i className="far fa-check-circle" /> : null}
            {status.massage}
          </p>
          <div className="buttons">
            <button type="button" disabled={!status} onClick={signin}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
