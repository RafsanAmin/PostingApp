import Styles from '../../scss/topbar.module.scss';
import Brand from './brand';
import Middle from './icons';
import Profile from './profile';

const TopBar = () => (
  <div className={Styles.topbar}>
    <Brand Styles={Styles.brandContainer} />
    <Middle Styles={Styles} />
    <Profile Styles={Styles} />
  </div>
);
export default TopBar;
