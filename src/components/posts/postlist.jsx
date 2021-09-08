/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect, useReducer, useState } from 'react';
import postAPI from '../../API/PostsAPI';
import AlertContext from '../../Contexts/AlertContext';
import Context from '../../Contexts/AppContext';
import PostCont from './postCont';

const limit = 20;
const initialize = { before: 0, posts: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const newPosts = state.posts.concat(action.posts);
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
        {post.posts
          ? post.posts.map((arr) => <PostCont key={Math.random().toString()} post={arr} />)
          : null}
      </div>
      <div>
        <div
          className="spin"
          style={{
            width: '100%',
            height: '50px',
            color: 'salmon',
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
