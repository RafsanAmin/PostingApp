/* eslint-disable react-hooks/exhaustive-deps */
import { toWords } from 'number-to-words';

const Image = ({ arr, index, Styles, delImg }) => (
  <>
    <div className={Styles[`${toWords(index + 1)}x`]}>
      <img
        onClick={() => {
          window.open(
            arr.clickPath,
            'popUpWindow',
            'height=900,width=1200,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
          );
        }}
        src={arr.viewPath}
        alt=""
      />
      <button title="Click to Remove" name={index} type="button" onClick={delImg}>
        <i className="fas fa-times    " />
      </button>
      <p>{`${(arr.size / (1024 * 1024)).toFixed(3)} MB`}</p>
    </div>
  </>
);
export default Image;
