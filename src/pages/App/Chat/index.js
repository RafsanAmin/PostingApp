import PageInfoContext from '../../../Contexts/PageInfoContext';
import TopBar from '../components/topbar/topbar';

const pageInfo = {
  name: 'chat',
  route: 'app/chat',
  description: 'Posting App Made by HRM Rafsan Amin',
};
const ChatApp = () => (
  <div className="chatapp-window">
    <PageInfoContext.Provider value={pageInfo}>
      <TopBar />
      <h1>Feature Not Available Yet</h1>
    </PageInfoContext.Provider>
  </div>
);

export default ChatApp;
