import React from 'react';
import Styles from '../scss/input.module.scss';

function Input(props) {
  const { value, setValue, type, name, plchold } = props;
  const placeholder = plchold || name;
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={Styles.loginField}>
      <input type={type} value={value} onChange={handleInput} placeholder={placeholder} />
    </div>
  );
}

export default Input;
