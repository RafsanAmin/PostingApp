/* eslint-disable no-bitwise */
import { useEffect, useRef, useState } from 'react';
import UserAuthenAPI from '../API/UserAuthen';

const textArea = ({ rows, value, setValue, placeholder, limit, update }) => {
  const [oflow, setOflow] = useState(false);
  const Ref = useRef();
  const handleTextArea = (e) => {
    const prevRows = e.target.rows;
    setOflow(false);
    e.target.rows = rows.min;
    const currentRows = ~~(e.target.scrollHeight / rows.lineH);
    if (currentRows === prevRows) {
      e.target.rows = currentRows;
    } else if (currentRows > rows.max) {
      setOflow(true);
      e.target.rows = rows.max;
    } else if (currentRows > rows.min) {
      e.target.rows = currentRows;
    }
    setValue(e.target.value);
  };
  useEffect(() => {
    UserAuthenAPI.log(rows);
    console.log('g');
    Ref.current.focus();
    Ref.current.blur();
  }, [update]);
  return (
    <textarea
      ref={Ref}
      style={oflow ? { overflowY: 'scroll' } : { overflowY: 'hidden' }}
      rows={rows.min}
      value={value}
      onFocus={handleTextArea}
      onChange={handleTextArea}
      onMouseEnter={handleTextArea}
      placeholder={placeholder}
      maxLength={limit}
    />
  );
};

export default textArea;
