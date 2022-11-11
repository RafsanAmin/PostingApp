import Styles from '../../scss/chatapp/cont.module.scss';
import ChatArea from './chatArea/chatArea';
import Menubar from './control/menubar';
import Menu from './menu/menu';

const Cont = () => (
  <div className={Styles.cont}>
    <Menubar />
    <Menu />
    <ChatArea />
  </div>
);

export default Cont;
