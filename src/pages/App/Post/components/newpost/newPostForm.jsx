/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
import { toWords } from 'number-to-words';
import { useContext, useRef, useState } from 'react';
import PostAPI from '../../../../../API/PostsAPI';
import AppContext from '../../../../../Contexts/AppContext';
import TextArea from '../../../../components/textarea';
import Styles from './scss/npform.module.scss';

let limit = 5;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const newPostForm = () => {
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setState, Alert } = useContext(AppContext);
  const File = useRef(null);
  const placeholder = 'Write Your Thoughts Here';
  const postHandle = !isLoading
    ? async () => {
        try {
          const time = new Date();
          setIsLoading(true);
          await PostAPI.addPost({
            text: postText,
            images,
            date: `${time.toLocaleTimeString()} ${time.toLocaleDateString()} - ${
              days[time.getDay()]
            }`,
          });
          setIsLoading(false);
          setState((state) => ({ ...state, addPost: false }));
          setImages(null);
          limit = 5;
          Alert({
            title: 'Successfull!',
            desc: 'Your Post is successfully added!',
            type: 'success',
            state: true,
          });
        } catch (err) {
          setIsLoading(false);
          Alert({
            title: 'Error!',
            desc: err,
            type: 'error',
            state: true,
          });
        }
      }
    : null;
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
                      return (
                        <img
                          onClick={() => {
                            window.open(
                              ImgPath,
                              'popUpWindow',
                              'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
                            );
                          }}
                          className={Styles[toWords(index + 1)]}
                          src={ImgPath}
                          alt=""
                        />
                      );
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
              <button
                className={`${Styles.addPost} ${isLoading ? Styles.disable : ''}`}
                type="button"
                onClick={postHandle}
              >
                {isLoading ? <img style={Styles.load} src="/loadingW.svg" alt="" /> : null}
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
