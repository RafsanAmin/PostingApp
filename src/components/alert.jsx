/* eslint-disable jsx-a11y/no-static-element-interactions */
import Styles from '../scss/alert.module.scss';

const Alert = ({ props }) => {
  const { state, title, desc, type, button, cIcon, setState } = props;
  let iconType;
  if (cIcon) {
    iconType = cIcon;
  } else if (type === 'success') {
    iconType = <i className="fas fa-check-circle" />;
  } else if (type === 'error') {
    iconType = <i className="fa fa-times-circle" aria-hidden="true" />;
  } else if (type === 'info') {
    iconType = <i className="fas fa-info-circle" />;
  } else if (type === 'warn') {
    iconType = <i className="fas fa-exclamation-triangle    " />;
  }
  return (
    <div style={{ position: 'absolute' }}>
      <div className={`${Styles.alertWin} ${state ? Styles.on : Styles.off}`}>
        <div className={`${Styles.alertCont} ${Styles[type]}`}>
          <div
            className={Styles.closeButton}
            onClick={() =>
              setState(() => ({ state: false, title: '', desc: '', type: '', cIcon: false }))
            }
          >
            <i className="fas fa-times" />
          </div>
          <div className={Styles.icon}>{iconType}</div>
          <div className={Styles.header}>
            <h3>{title || ''}</h3>
          </div>
          <div className={Styles.p}>{desc || ''}</div>
          {button ? <div className={Styles.button}>{button}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Alert;
