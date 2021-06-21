import React from 'react';

function Input(props) {
  const { value, setValue, type, name, classP } = props;
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={`${classP}-field ${name.replace(/\s/g, '-').toLowerCase()}`}>
      {/* <p>{name}</p> */}
      <input type={type} value={value} onChange={handleInput} placeholder={name} />
    </div>
  );
}

export default Input;
