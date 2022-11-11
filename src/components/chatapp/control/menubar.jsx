import React from 'react';
import Styles from '../../../scss/chatapp/menubar.module.scss';
import DuoIcon from '../../DuoIcon';

const MenuItem = ({ icon }) => <div className={Styles.menuItem}>{icon}</div>;

const Menubar = () => (
  <div className={Styles.menubar}>
    <MenuItem
      icon={
        <DuoIcon main="fa-solid fa-user-group" child="fa-solid fa-circle-plus" pos={[30, 30]} msk />
      }
    />
    <MenuItem icon={<DuoIcon main="fa-solid fa-arrow-right-to-bracket dark" pos={[30, 30]} />} />
  </div>
);

export default Menubar;
