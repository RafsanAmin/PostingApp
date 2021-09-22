const AppReducer = (state, action) => {
  switch (action.type) {
    case 'AP_1':
      return { ...state, addPost: true };
    case 'RELOAD_1':
      return { ...state, repost: true };
    case 'RELOAD_0':
      return { ...state, repost: false, fullReload: false };
    case 'STOP':
      return { ...state, stop: true };
    case 'FULL_RELOAD':
      return { ...state, repost: false, fullReload: true, stop: false };
    case 'EP_1':
      return { ...state, editPost: { state: true, post: action.post } };
    case 'PF_0':
      return { ...state, addPost: false, editPost: { state: false, post: null } };
    case 'USER':
      return { ...state, userid: action.id };
    case 'CONT': {
      return { ...state, cont: action.e };
    }
    default:
      return state;
  }
};
const initalization = (page) => ({
  name: page,
  description: 'Posting App Made by HRM Rafsan Amin',
  addPost: false,
  editPost: { state: false, post: null },
  repost: false,
  fullReload: false,
  stop: false,
  userid: null,
  cont: null,
});
export { AppReducer, initalization };
