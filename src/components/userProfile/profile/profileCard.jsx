import Styles from '../../../scss/profilecard.module.scss';
import Bio from './bio';
import Desc from './desc';
import Profile from './profile';

const profileCard = () => (
  <header className={Styles.superCont}>
    <div className={Styles.innerCont}>
      <Desc Styles={Styles} />
      <Profile Styles={Styles} />
      <Bio Styles={Styles} />
    </div>
  </header>
);
export default profileCard;
