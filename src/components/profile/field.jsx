import React from 'react';
import style from '../../scss/field.module.scss';

const Field = ({ field, text, icon, styles }) => (
  <div type="button" className={style.fieldCont} style={styles}>
    <div className={style.icon}>{icon || <i />}</div>
    <h6 className={style.h6}>{`${field}:`}</h6>
    <p>{text}</p>
  </div>
);
export default Field;
