import React from 'react';

function brand(props) {
  const { Styles } = props;
  return (
    <div className={Styles}>
      <img style={{ paddingRight: '0.5rem' }} src="/posts.svg" alt="" width="40" />
      <h1> RAFPOST</h1>
    </div>
  );
}

export default brand;
