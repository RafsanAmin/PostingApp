import { forwardRef } from 'react';
import Styles from '../scss/input.module.scss';

function Input({ value, setValue, type, name, plchold, style, limit, t }, ref) {
  const placeholder = plchold || name;
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={Styles.field}>
      {t ? <span>{t}</span> : null}
      <input
        style={style}
        ref={ref}
        type={type}
        value={!ref ? value : null}
        onChange={!ref ? handleInput : () => {}}
        placeholder={placeholder}
        maxLength={limit}
      />
    </div>
  );
}

export default forwardRef(Input);
