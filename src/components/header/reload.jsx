/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';

const Reload = (props) => {
  const { Styles } = props;
  const [, setState] = useContext(AppContext);
  const addPostTrigger = () => {
    setState({ type: 'FULL_RELOAD' });
  };
  return (
    <>
      <button className={Styles.reloadCont} type="button" onClick={addPostTrigger}>
        <div className={Styles.image}>
          <i className={`fa-solid fa-rotate-right ${Styles.img}`} alt="ds" />
        </div>
        <div className={Styles.text}>
          <p>
            Reload <br /> Posts
          </p>
        </div>
      </button>
    </>
  );
};
export default Reload;
