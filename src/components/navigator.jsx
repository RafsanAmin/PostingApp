import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../scss/navigator.module.scss';

const Navigator = ({ list }) => {
  const [state, setState] = useState(0);
  const compList = [];
  const router = useRouter();

  useEffect(() => {
    if (!router.query.t) {
      router.replace(`${window.location.pathname}?t=${0}`);
    }
    setState(Number(router.query.t));
  }, [router.query]);
  return (
    <div className={Styles.super}>
      <div className={Styles.nav}>
        {list.map(({ text, icon, comp }, ind) => {
          compList.push(comp);
          return (
            <div
              className={`${Styles.Item} ${state === ind ? Styles.active : ''}`}
              onClick={() => {
                router.push(`${window.location.pathname}?t=${ind}`);
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
