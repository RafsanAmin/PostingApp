/* eslint-disable react-hooks/exhaustive-deps */
import { memo } from 'react';
import PostList from './postlist';

function postsC({ grpID }) {
  return (
    <div>
      <style jsx>
        {`
          .reload {
            display: block;
            text-align: center;
            margin: 1rem auto 0 auto;
            background-color: #199af0;
            color: #fff;
            border: 0;
            padding: 0.3rem 0.75rem;
            font-size: 1rem;
            transition: 0.25s;
            cursor: pointer;
            border-radius: 20px;
          }
          i {
            margin-right: 0.5rem;
          }
          .reload:hover {
            background-color: #055c9d;
          }
        `}
      </style>
      {/* <button
        className="reload"
        type="button"
        onClick={() => {
          setState({ type: 'FULL_RELOAD' });
        }}
      >
        <i className="fas fa-spinner" />
        Reload
      </button> */}
      <PostList type="latest" grpID={grpID} />
    </div>
  );
}

export default memo(postsC);
