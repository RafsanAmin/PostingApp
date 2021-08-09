/* eslint-disable consistent-return */
import { toWords } from 'number-to-words';
import { useContext, useRef, useState } from 'react';
import AppContext from '../../../../../Contexts/AppContext';
import TextArea from '../../../../components/textarea';
import Styles from './scss/npform.module.scss';

let limit = 5;
const newPostForm = () => {
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState(null);
  const { setState, Alert } = useContext(AppContext);
  const File = useRef(null);
  const placeholder = 'Write Your Thoughts Here';
  const changeImg = () => {
    console.log(limit);
    const oleLimit = limit;
    limit -= Array.from(File.current.files).length;
    if (limit < 0) {
      Alert({
        title: 'Stop!',
        desc: 'Not more than 5 photos in Single Post',
        type: 'error',
        state: true,
      });
      limit = oleLimit;
    } else {
      setImages((state) => {
        if (!state) {
          return Array.from(File.current.files);
        }
        return state.concat(Array.from(File.current.files));
      });
    }
  };
  const close = () => {
    setState((state) => ({ ...state, addPost: false }));
    setImages(null);
    limit = 5;
  };
  return (
    <div className={Styles.npFormWin}>
      <div className={Styles.npFormCont}>
        <div>
          <div className={Styles.postTextCont}>
            <TextArea
              rows={{ lineH: 24, min: images ? 2 : 7, max: 10 }}
              value={postText}
              setValue={setPostText}
              placeholder={placeholder}
            />
          </div>
          {images ? (
            <div className={Styles.imagesGridCont}>
              <p>
                <i className="fas fa-images" />
                Added Images
              </p>
              <div
                className={(() => {
                  if (images.length <= 5) {
                    return Styles[toWords(images.length)];
                  }
                })()}
              >
                {images
                  ? images.map((arr, index) => {
                      const ImgPath = URL.createObjectURL(arr);
                      return <img className={Styles[toWords(index + 1)]} src={ImgPath} alt="" />;
                    })
                  : null}
              </div>
            </div>
          ) : null}

          <input
            ref={File}
            type="file"
            name=""
            onChange={changeImg}
            hidden
            accept="image/jpeg, image/png, image/gif"
            multiple
          />
          <div className={Styles.bottomBar}>
            <div className={Styles.addResources}>
              <button className={Styles.addPic} type="button" onClick={() => File.current.click()}>
                <i className="fas fa-images">
                  <i className={`fas fa-plus-square ${Styles.plus}`} />
                </i>
              </button>
            </div>
            <div className={Styles.btnCont}>
              <button className={Styles.closeBtn} type="button" onClick={close}>
                <i className="fas fa-times" />
              </button>
              <button className={Styles.addPost} type="button">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default newPostForm;
