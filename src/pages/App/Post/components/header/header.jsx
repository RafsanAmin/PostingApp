import Clock from './components/addPost';
import AddPost from './components/clock';
import Styles from './scss/header.module.scss';

const Header = () => (
  <div className={Styles.headerCont}>
    <div>
      <Clock Styles={Styles} />
      <AddPost Styles={Styles} />
    </div>
  </div>
);
export default Header;
