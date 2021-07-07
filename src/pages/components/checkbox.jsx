/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Styles from './scss/checkbox.module.scss';

const Checkbox = (props) => {
  const { setState, state, label } = props;
  return (
    <div
      className={Styles.checkboxCont}
      onClick={() => {
        setState(!state);
      }}
    >
      <div className={`${Styles.checkbox} ${state ? Styles.checked : ''}`} />
      <p>{label}</p>
    </div>
  );
};

export default Checkbox;
