/* eslint-disable no-bitwise */
import { useState } from 'react';

const textArea = ({ rows, value, setValue, placeholder, limit }) => {
  const [oflow, setOflow] = useState(false);
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
  return (
    <textarea
      style={oflow ? { overflowY: 'scroll' } : { overflowY: 'hidden' }}
      rows={rows.min}
      value={value}
      onChange={handleTextArea}
      placeholder={placeholder}
      maxLength={limit}
    />
  );
};

export default textArea;
