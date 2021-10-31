import Styles from '../../scss/header.module.scss';
import Clock from './addPost';
import AddPost from './clock';

const Header = () => (
  <div className={Styles.headerCont}>
    <div>
      <Clock Styles={Styles} />
      <AddPost Styles={Styles} />
    </div>
  </div>
);
export default Header;
