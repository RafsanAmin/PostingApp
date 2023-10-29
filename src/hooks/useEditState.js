import { useMemo, useReducer } from 'react';
import editContext from '../Contexts/EditContext';

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'AP_1':
      return { ...state, addPost: true };
    case 'AG_1':
      return { ...state, addGroup: true };
    case 'EP_1':
      return { ...state, editPost: { state: true, post: action.post } };
    case 'PF_0':
      return { ...state, addPost: false, editPost: { state: false, post: null }, addGroup: false };
    default:
      return state;
  }
};
const initalization = {
  addPost: false,
  editPost: { state: false, post: null },
  addGroup: false,
};
const useEditState = () => {
  const [editState, setEditState] = useReducer(AppReducer, initalization);
  const editStateReducer = useMemo(() => [editState, setEditState], [editState]);

  return editStateReducer;
};

export { editContext, useEditState };
