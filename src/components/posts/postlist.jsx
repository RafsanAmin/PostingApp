/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect, useReducer, useState } from 'react';
import {
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
import editContext from '../../Contexts/EditContext';
import useForceUpdate from '../../hooks/useForceUpdate';
import useResizeTrigger from '../../hooks/useResizeTrigger';
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
const PostList = ({ type, user, grpID }) => {
  const [post, setPosts] = useReducer(reducer, initialize);
  const [state, setState] = useContext(Context);
  const [, setEditPost] = useContext(editContext);

  const [loading, setLoading] = useState(false);
  const Alert = useContext(AlertContext);
  const cont = useContext(ContContext);
  const [, forceUpdate] = useForceUpdate();
  const heightCache = new CellMeasurerCache({
    defaultHeight: 400,
    fixedWidth: true,
  });

  const render = ({ index, key, style, parent }) => (
    <CellMeasurer cache={heightCache} key={key} parent={parent} columnIndex={0} rowIndex={index}>
      {post.posts[index] ? (
        <div style={style}>
          <PostCont post={post.posts[index]} setEditPost={setEditPost} />
        </div>
      ) : (
        <div style={{ ...style }}>
          {' '}
          <p style={{ height: '100px' }} />
        </div>
      )}
    </CellMeasurer>
  );
  const main = async (newP) => {
    try {
      

      setLoading(true);
      if (newP) {
        const { posts } = await postAPI.getPost(type, 0, limit, user, grpID);
        setPosts({ type: 'NEW', posts });
      } else {
        const { posts, hasMore } = await postAPI.getPost(type, post.before, limit, user, grpID);
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
  useResizeTrigger(() => {
    

    forceUpdate();
  }, []);
  useEffect(() => {
    if (!(state.fullReload || state.repost)) {
      main(true);
    }
  }, [user]);
  useEffect(() => {
    

    if (!loading) {
      if (state.fullReload === true) {
        main(true);
      } else if (state.repost === true) {
        main();
      }
    }
  }, [state.fullReload, state.repost]);
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
          {({ height, isScrolling, registerChild, scrollTop, width }) => (
            <div ref={registerChild}>
              <List
                overscanRowCount={1}
                autoHeight
                height={Math.max(height, 700)}
                width={Math.min(700, width - 24)}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                rowRenderer={render}
                deferredMeasurementCache={heightCache}
                rowHeight={heightCache.rowHeight}
                rowCount={post.posts.length + 1}
              />
            </div>
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
