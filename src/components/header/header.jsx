import Styles from '../../scss/header.module.scss';
import AddPost from './addPost';
import Reload from './reload';

const Header = () => (
  <div className={Styles.headerCont}>
    <div>
      <AddPost Styles={Styles} />
      <Reload Styles={Styles} />
      {/* <AddPost Styles={Styles} /> */}
    </div>
  </div>
);
export default Header;
