/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

const Checkbox = (props) => {
  const { setState, state, label } = props;
  return (
    <div
      className="checkbox-cont"
      onClick={() => {
        setState(!state);
      }}
    >
      <div className={state ? 'checkbox checked' : 'checkbox'} />
      <p>{label}</p>
    </div>
  );
};

export default Checkbox;
