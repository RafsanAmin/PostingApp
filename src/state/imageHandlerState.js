const Reducer = (state, action) => {
  if (action.type === 'ADD') {
    const oleLimit = state.limit;
    const { images } = action;
    const newLimit = oleLimit - Array.from(images).length;
    if (!state.images) {
      return { images: Array.from(images), limit: newLimit };
    }
    return { images: state.images.concat(Array.from(images)), limit: newLimit };
  }
  if (action.type === 'CLEAR') {
    return { images: [], limit: 5 };
  }
  if (action.type === 'DELETE') {
    const s = state.images;
    const newLimit = state.limit + 1;
    s.splice(action.index, 1);
    if (s.length === 0) {
      return { ...state, images: [], limit: newLimit };
    }
    return { ...state, images: s, limit: newLimit };
  }

  return { ...state };
};
const initialState = {
  images: [],
  limit: 5,
};

export { initialState, Reducer };
