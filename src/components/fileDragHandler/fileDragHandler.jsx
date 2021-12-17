import React, { useState } from 'react';
import Styles from '../../scss/fileDropHandler.module.scss';

const FileDragHandler = ({ className, handler, children, text, cIcon }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrag={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handler(e.dataTransfer.files);
      }}
      className={`${className} ${Styles.cont}`}
    >
      <div className={`${Styles.dragOverlay} ${isDragging ? Styles.doOn : Styles.doOff}`}>
        {isDragging ? (
          <div className={Styles.innerDO}>
            {cIcon || <i className="fas fa-images" />}
            <p>{text}</p>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default FileDragHandler;
