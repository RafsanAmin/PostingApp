import React from 'react';
import Styles from '../scss/checkbox.module.scss';

const Checkbox = ({ setState, state, label }) => (
  <div
    className={`${Styles.checkboxCont}`}
    onClick={() => {
      setState(!state);
    }}
  >
    <div className={`${Styles.checkbox} ${state ? Styles.checked : ''}`} />
    <p>{label}</p>
  </div>
);

export default Checkbox;
