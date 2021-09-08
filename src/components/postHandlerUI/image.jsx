/* eslint-disable react-hooks/exhaustive-deps */
import Axios from 'axios';
import { toWords } from 'number-to-words';
import { useEffect, useState } from 'react';

const Image = ({ arr, index, Styles, delImg }) => {
  const ImgViewPath =
    typeof arr !== 'string'
      ? URL.createObjectURL(arr)
      : `https://res.cloudinary.com/dyjrfa6c2/q_15/profilepic/${arr}`;
  const ImgClickPath =
    typeof arr !== 'string'
      ? URL.createObjectURL(arr)
      : `https://res.cloudinary.com/dyjrfa6c2/profilepic/${arr}`;
  const [size, setSize] = useState(arr.size || 0);
  useEffect(() => {
    if (!arr.size) {
      Axios.head(ImgClickPath).then((res) => {
        setSize(res.headers['content-length']);
      });
    }
  }, []);
  console.log('reterdf');
  return (
    <>
      <div className={Styles[`${toWords(index + 1)}x`]}>
        <img
          onClick={() => {
            window.open(
              ImgClickPath,
              'popUpWindow',
              'height=900,width=1200,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
            );
          }}
          src={ImgViewPath}
          alt=""
        />
        <button title="Click to Remove" name={index} type="button" onClick={delImg}>
          <i className="fas fa-times    " />
        </button>
        <p>{`${(size / (1024 * 1024)).toFixed(3)} MB`}</p>
      </div>
    </>
  );
};
export default Image;
