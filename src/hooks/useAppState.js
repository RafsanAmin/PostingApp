import { useMemo, useReducer } from 'react';
import AppContext from '../Contexts/AppContext';

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'RELOAD_1':
      return { ...state, repost: true };
    case 'RELOAD_0':
      return { ...state, repost: false, fullReload: false };
    case 'STOP':
      return { ...state, stop: true };
    case 'FULL_RELOAD':
      return { ...state, repost: false, fullReload: true, stop: false };
    case 'USER_GRP':
      return {
        ...state,
        userid: action.id,
        grpID: action.grpID,
        own: action.own,
        username: action?.name,
      };
    case 'GRP':
      return { ...state, grpInfo: action.grpInfo };
    case 'USER':
      return { ...state, userid: action.id, username: action?.name };
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
  repost: false,
  fullReload: false,
  stop: false,
  userid: undefined,
  cont: null,
  grpID: undefined,
  grpInfo: undefined,
  own: false,
  username: '',
});

const useAppState = (pageName) => {
  const [appState, setAppState] = useReducer(AppReducer, initalization(pageName));
  const AppStateReducer = useMemo(() => [appState, setAppState], [appState]);

  return AppStateReducer;
};
const reloadPost = (target, appStateArr) => {
  const [appState, setAppState] = appStateArr;
  if (target.clientHeight + target.scrollTop >= target.scrollHeight - 1500) {
    if (!appState.stop) {
      setAppState({ type: 'RELOAD_1' });
    }
  }
};

export { AppContext, reloadPost, useAppState };
