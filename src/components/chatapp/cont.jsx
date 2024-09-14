import Styles from '../../scss/chatapp/cont.module.scss';
import ChatArea from './chatArea/chatArea';

const ChatCont = () => (
  <div className={Styles.cont}>
    <ChatArea />
  </div>
);

export default ChatCont;
