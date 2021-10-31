import React from 'react';

function brand(props) {
  const { Styles } = props;
  return (
    <div className={Styles}>
      <i className="fas fa-file-invoice" />
      <h1> RAFPOST</h1>
    </div>
  );
}

export default brand;
