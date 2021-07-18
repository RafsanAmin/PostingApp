import React from 'react';

function Input(props) {
  const { value, setValue, type, name, classP, plchold } = props;
  const placeholder = plchold || name;
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={`${classP ? `${classP}-field ` : ''}${name.replace(/\s/g, '-').toLowerCase()}`}>
      <input type={type} value={value} onChange={handleInput} placeholder={placeholder} />
    </div>
  );
}

export default Input;
