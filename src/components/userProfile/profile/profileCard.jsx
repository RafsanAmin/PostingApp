import Styles from '../../../scss/profilecard.module.scss';
import Bio from './bio';
import Desc from './desc';

const profileCard = () => (
  <header className={Styles.superCont}>
    <div className={Styles.innerCont}>
      {/* <Profile Styles={Styles} /> */}
      <Desc Styles={Styles} />
      <Bio Styles={Styles} />
    </div>
  </header>
);
export default profileCard;
