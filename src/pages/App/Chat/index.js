import AppContext from '../../../Contexts/AppContext';
import TopBar from '../components/topbar/topbar';

const pageInfo = {
  name: 'chat',
  route: 'app/chat',
  description: 'Posting App Made by HRM Rafsan Amin',
};
const tempstyle = {
  cont: { position: 'relative', height: '100vh' },
  head: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: '600',
    fontFamily: 'ubuntu, arial',
    textAlign: 'Center',
  },
};
const ChatApp = () => (
  <div style={tempstyle.cont} className="chatapp-window">
    <AppContext.Provider value={{ state: pageInfo }}>
      <TopBar />
      <h1 style={tempstyle.head}>Feature isnt Available</h1>
    </AppContext.Provider>
  </div>
);

export default ChatApp;
