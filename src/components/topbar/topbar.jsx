import Styles from '../../scss/topbar.module.scss';
import Dashboard from '../userProfile/dashboard/main';
import Brand from './brand';
import Middle from './icons';
import Profile from './profile';

const TopBar = ({ c, dashboard, hero }) => (
  <div className={`${hero ? Styles?.hero : ''} ${Styles.topbar} ${c} `}>
    <Brand
      Styles={`${Styles.brandContainer} ${Dashboard && Styles.override}`}
      Text={dashboard ? 'Dashboard' : 'RafPost'}
    />
    {!hero ? (
      <>
        {!dashboard && <Middle Styles={Styles} />}
        <Profile Styles={Styles} />
      </>
    ) : null}
  </div>
);
export default TopBar;
