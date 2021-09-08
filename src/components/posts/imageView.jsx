import { toWords } from 'number-to-words';

const ImageView = ({ Styles, photos }) => (
  <>
    <div className={`${Styles.images} ${photos ? Styles[toWords(photos.length)] : null}`}>
      {photos
        ? photos.map((arr, index) => (
            <div key={arr} className={Styles[`${toWords(index + 1)}x`]}>
              <img
                onClick={() => {
                  window.open(
                    `https://res.cloudinary.com/dyjrfa6c2/profilepic/${arr}`,
                    'popUpWindow',
                    'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
                  );
                }}
                title="Click to view in full quality"
                src={`https://res.cloudinary.com/dyjrfa6c2/q_15/profilepic/${arr}`}
                alt=""
              />
            </div>
          ))
        : null}
    </div>
  </>
);
export default ImageView;
