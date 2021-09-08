import { toWords } from 'number-to-words';
import { memo } from 'react';
import Image from './image';

const ImagePreview = ({ images, Styles, delImg }) => {
  console.log('rendere');
  return (
    <>
      {images.images.length > 0 ? (
        <div className={Styles.imagesGridCont}>
          <p>
            <i className="fas fa-images" />
            Added Images
          </p>
          <div
            className={(() => {
              if (images.images.length <= 5) {
                return Styles[toWords(images.images.length)];
              }
            })()}
          >
            {images.images.map((arr, index) => (
              <Image key={Math.random()} arr={arr} index={index} Styles={Styles} delImg={delImg} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(ImagePreview);
