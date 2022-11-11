import React from 'react';

const DuoIcon = ({ main, child, pos, msk }) => (
  <span className="fa-stack duotone">
    <i className={`${main} fa-stack-2x light`} />
    <i
      style={{
        transform: `translate(${pos[0]}%, ${pos[1]}%)`,
      }}
      className={`${child} fa-stack-1x dark ${msk ? 'masked' : ''}`}
    />
  </span>
);

export default DuoIcon;
