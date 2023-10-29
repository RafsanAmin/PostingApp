import React, { useState } from 'react';
import Styles from '../scss/navigator.module.scss';

const Navigator = ({ list }) => {
  const [state, setState] = useState(0);
  const compList = [];
  return (
    <div className={Styles.super}>
      <div className={Styles.nav}>
        {list.map(({ text, icon, comp }, ind) => {
          compList.push(comp);
          return (
            <div
              className={`${Styles.Item} ${state === ind ? Styles.active : ''}`}
              onClick={() => {
                setState(ind);
              }}
            >
              {icon}
              <p>{text}</p>
            </div>
          );
        })}
      </div>
      <div className={Styles.container}>{compList[state]}</div>
    </div>
  );
};

export default Navigator;
