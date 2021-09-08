import { useState } from 'react';

const Dbtn = ({ func }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <style jsx>
        {`
          .btn {
            display: flex;
            align-items: center;
          }
          img {
            width: 1.25rem;
            margin-right: 0.5rem;
            animation: spin 0.7s infinite linear;
            transform-origin: center center;
            transform-box: fill-box;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <button
        className="btn"
        type="button"
        onClick={() => {
          setLoading(true);
          func();
        }}
      >
        {isLoading ? <img src="/loadingW.svg" alt="" /> : null} Delete
      </button>
    </>
  );
};

export default Dbtn;
