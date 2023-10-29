import React, { useContext, useRef, useState } from 'react';
import AlertContext from '../../../Contexts/AlertContext';
import Styles from '../../../scss/chatapp/menubar.module.scss';
import DuoIcon from '../../DuoIcon';
import Input from '../../Input';

const MenuItem = ({ icon, onClick }) => (
  <button type="button" onClick={onClick} className={Styles.menuItem}>
    {icon}
  </button>
);

const Menubar = () => {
  const a = useContext(AlertContext);
  const [query, setQuery] = useState();
  const ref = useRef();
  const joinGroup = () => {};

  const joinGroupHandler = () => {
    a({
      state: 'true',
      title: 'Join Group',
      desc: (
        <>
          <p>Please Write the ID of the group to join.</p>
          <Input
            style={{
              margin: '0',
            }}
            name="Group ID"
            limit={64}
            ref={ref}
          />
        </>
      ),
      type: 'info',
      button: (
        <button type="button" onClick={joinGroup}>
          Join
        </button>
      ),
      cIcon: (
        <DuoIcon main="fa-solid fa-user-group" child="fa-solid fa-circle-plus" pos={[30, 30]} msk />
      ),
    });
  };

  return (
    <div className={Styles.menubar}>
      <Input type="search" value={query} setValue={setQuery} />
      <div className={Styles.right}>
        <MenuItem
          icon={
            <DuoIcon
              main="fa-solid fa-user-group"
              child="fa-solid fa-circle-plus"
              pos={[30, 30]}
              msk
            />
          }
          onClick={joinGroupHandler}
        />
        <MenuItem
          icon={<DuoIcon main="fa-solid fa-arrow-right-to-bracket dark" pos={[30, 30]} />}
        />
      </div>
    </div>
  );
};

export default Menubar;
