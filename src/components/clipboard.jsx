/* eslint-disable no-alert */
import { useRef } from 'react';
import Styles from '../scss/clipboard.module.scss';

const clipboard = ({ copyText }) => {
  const href = useRef();
  const copy = () => {
    href.current.select();
    document.execCommand('copy');
    alert('Copied!');
  };
  return (
    <div className={Styles.cont}>
      <input ref={href} type="text" readOnly className={Styles.copy} value={copyText} />
      <div className={Styles.btn}>
        <button type="button" onClick={copy}>
          <i className="far fa-copy" />
        </button>
      </div>
    </div>
  );
};
export default clipboard;
