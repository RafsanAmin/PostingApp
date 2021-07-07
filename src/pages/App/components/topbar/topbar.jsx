import Brand from './components/brand';
import Middle from './components/icons';
import Profile from './components/profile';
import Styles from './scss/topbar.module.scss';

const TopBar = () => (
  <div className={Styles.topbar}>
    <Brand Styles={Styles.brandContainer} />
    <Middle Styles={Styles} />
    <Profile Styles={Styles} />
  </div>
);
export default TopBar;
