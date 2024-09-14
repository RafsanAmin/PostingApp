import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import AppContext from '../../../Contexts/AppContext';
import Styles from '../../../scss/chatapp/cont.module.scss';
import Loading from '../../Loading';

let socket;

const ChatArea = () => {
  const [chat, setChat] = useState([]);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [app, ss] = useContext(AppContext);
  const chatContRef = useRef();
  // const a = useContext(AlertContext);

  
  const addChat = (newChat, self) => {
    setChat((s) => [...s, { ...newChat, self }]);

    

    if (chatContRef && chatContRef?.current) {
      setTimeout(() => chatContRef.current.scrollTo(0, chatContRef.current.scrollHeight + 100), 50);
    }
  };

  useEffect(() => {
    setChat(app.grpInfo.chats);
    if (chatContRef && chatContRef?.current) {
      setTimeout(() => chatContRef.current.scrollTo(0, chatContRef.current.scrollHeight + 100), 50);
    }
  }, [app.grpInfo]);

  useEffect(() => {
    ss({ type: 'FULL_RELOAD' });

    socket = io('/');
    socket.emit('join-room', app?.grpID);
    socket.on('resp', (r) => {
      
      if (r.done) {
        setConnected(true);
      }
    });
    socket.on('chat_b', (r) => {
      
      addChat(r);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const data = {
      data: { text: message, userId: app.userid, senderName: app.username },
      roomId: app?.grpID,
    };

    addChat(data.data, true);

    if (socket) {
      socket.emit('chat', data);
    }
    setMessage('');
  };

  return (
    <>
      {app.grpInfo ? (
        <div>
          <div className={Styles.chatList} ref={chatContRef}>
            {connected ? (
              <p style={{ textAlign: 'center', opacity: 0.3 }}>Connected Successfully</p>
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.3 }}>Not Connected Yet</p>
            )}
            {chat.map((s) => (
              <div
                className={`${Styles.chat} ${s.self || s.userId === app.userid ? Styles.self : ''}`}
              >
                <img
                  src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${s.userId}`}
                  alt="profilePic"
                />
                <p className={Styles.text}>
                  <span className={Styles.user}>{s.senderName || 'Unknown'}</span>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <div className={Styles.write}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thought"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                sendMessage();
              }}
              type="button"
              disabled={message === ''}
            >
              <i className="fa-regular fa-paper-plane" />
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ChatArea;
