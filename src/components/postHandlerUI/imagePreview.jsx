/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
import axios from 'axios';
import { toWords } from 'number-to-words';
import { memo, useEffect, useState } from 'react';
import Image from './image';

const URLO = URL || window.webkitURL;
const ImgPrevGet = (images) =>
  new Promise(async (resolve) => {
    if (images.length <= 0) {
      resolve([]);
    } else {
      const array = [];
      let done = false;
      for (let i = 0; i < images.length; i++) {
        const arr = images[i];
        if (typeof arr === 'string') {
          const viewPath = `https://res.cloudinary.com/dyjrfa6c2/q_15/profilepic/${arr}`;
          const clickPath = `https://res.cloudinary.com/dyjrfa6c2/profilepic/${arr}`;
          const res = await axios.head(clickPath);
          array.push({
            viewPath,
            clickPath,
            size: res.headers['content-length'],
          });
          done = true;
        } else {
          array.push({
            viewPath: URLO.createObjectURL(arr),
            clickPath: URLO.createObjectURL(arr),
            size: arr.size,
          });
          done = true;
        }
      }
      if (done) {
        resolve(array);
      }
    }
  });

const ImagePreview = ({ image, Styles, delImg }) => {
  const { images } = image;
  const [imagePreview, setImagePreview] = useState([]);
  useEffect(() => {
    const main = async () => {
      const imgPrev = await ImgPrevGet(images);
      setImagePreview(imgPrev);
    };
    main();
  }, [image, images]);
  return (
    <>
      {imagePreview.length > 0 ? (
        <div className={Styles.imagesGridCont}>
          <p>
            <i className="fas fa-images" />
            Added Images
          </p>
          <div
            className={(() => {
              if (imagePreview.length <= 5) {
                return Styles[toWords(imagePreview.length)];
              }
            })()}
          >
            {imagePreview.map((arr, index) => (
              <Image key={Math.random()} arr={arr} index={index} Styles={Styles} delImg={delImg} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(ImagePreview);
