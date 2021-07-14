/* eslint-disable jsx-a11y/no-static-element-interactions */
import Styles from './scss/alert.module.scss';

const Alert = (props) => {
  const { header, text, type, state, setState, children } = props;
  let iconType;
  if (type === 'success') {
    iconType = <i className="fas fa-check-circle" />;
  } else if (type === 'error') {
    iconType = <i className="fa fa-times-circle" aria-hidden="true" />;
  } else if (type === 'info') {
    iconType = <i className="fas fa-info-circle" />;
  }
  return (
    <div style={{ position: 'absolute' }}>
      {state ? (
        <div className={Styles.alertWin}>
          <div className={`${Styles.alertCont} ${Styles[type]}`}>
            <div
              className={Styles.closeButton}
              onClick={() => setState(() => ({ state: false, title: '', desc: '', type: '' }))}
            >
              <i className="fas fa-times" />
            </div>
            <div className={Styles.icon}>{iconType}</div>
            <div className={Styles.header}>
              <h3>{header || 'No header'}</h3>
            </div>
            <p>{text || 'No text'}</p>
            {children ? (
              <>
                <br />
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Alert;
