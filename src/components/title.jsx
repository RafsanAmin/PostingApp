import React from 'react';
import Styles from '../scss/title.module.scss';

const Title = ({ text, icon }) => (
  <div className={Styles.title}>
    {icon}
    <h1>{text}</h1>
  </div>
);
export default Title;
