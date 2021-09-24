import { memo, useContext, useEffect, useReducer, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  // eslint-disable-next-line prettier/prettier
  WindowScroller
} from 'react-virtualized';
import postAPI from '../../API/PostsAPI';
import AlertContext from '../../Contexts/AlertContext';
import Context from '../../Contexts/AppContext';
import ContContext from '../../Contexts/ContContext';
import PostCont from './postCont';

const limit = 40;
const initialize = { before: 0, posts: [] };
const reducer = (state, action) => {
  const newPosts = state.posts.concat(action.posts);
  switch (action.type) {
    case 'ADD':
      if (newPosts.length === state.posts.length) {
        return state;
      }

      return {
        before: state.before + action.posts.length,
        posts: state.posts.concat(action.posts),
      };

    case 'NEW':
      return { before: limit, posts: action.posts };
    default:
      return state;
  }
};
const PostList = ({ type, user }) => {
  const [post, setPosts] = useReducer(reducer, initialize);
  const [state, setState] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const Alert = useContext(AlertContext);
  const cont = useContext(ContContext);
  const heightCache = new CellMeasurerCache({
    defaultHeight: 400,
    fixedWidth: true,
  });
  const render = ({ index, key, style, parent }) => (
    <CellMeasurer cache={heightCache} key={key} parent={parent} columnIndex={0} rowIndex={index}>
      <div style={style}>
        <PostCont post={post.posts[index]} />
      </div>
    </CellMeasurer>
  );
  const main = async (newP) => {
    try {
      setLoading(true);
      if (newP) {
        const { posts } = await postAPI.getPost(type, 0, limit, user);
        setPosts({ type: 'NEW', posts });
      } else {
        const { posts, hasMore } = await postAPI.getPost(type, post.before, limit, user);
        if (!hasMore) {
          setState({ type: 'STOP' });
        } else {
          setPosts({ type: 'ADD', posts });
        }
      }
      setLoading(false);
      setState({ type: 'RELOAD_0' });
    } catch (err) {
      Alert({ type: 'error', state: true, title: 'Error', desc: err.massage });
    }
  };
  useEffect(() => {
    main(true);
  }, []);
  useEffect(() => {
    if (!loading) {
      if (state.fullReload === true) {
        main(true);
      } else if (state.repost === true) {
        main();
      }
    }
  }, [state]);
  return (
    <>
      <style jsx>{`
        .spin img {
          animation: spin 1s linear infinite;
          width: 50px;
          margin-bloack: auto;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem 0',
        }}
      >
        <WindowScroller scrollElement={cont}>
          {({ height, isScrolling, registerChild, scrollTop }) => (
            <AutoSizer disableHeight style={{ width: '100%' }}>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    height={height}
                    width={width}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    rowRenderer={render}
                    deferredMeasurementCache={heightCache}
                    rowHeight={heightCache.rowHeight}
                    rowCount={post.posts.length}
                  />
                </div>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
      <div>
        <div
          className="spin"
          style={{
            width: '100%',
            height: '50px',
            color: '#fff',
            textAlign: 'center',
            paddingBottom: '5rem',
          }}
        >
          {loading ? <img src="/loading.svg" alt="" /> : null}
        </div>
      </div>
      {/* <button type="button" onClick={() => main()}>
        Aro Chai?
      </button> */}
    </>
  );
};

export default memo(PostList);
