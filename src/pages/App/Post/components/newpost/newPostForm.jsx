import { useContext, useRef, useState } from 'react';
import AppContext from '../../../../../Contexts/AppContext';
import Styles from './scss/npform.module.scss';

const newPostForm = () => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState(null);
  const { setState } = useContext(AppContext);
  const File = useRef(null);
  const placeholder = 'Write Your Thoughts Here';
  const changeImg = () => {
    // eslint-disable-next-line consistent-return
    setImages((state) => {
      if (!state) {
        return Array.from(File.current.files);
      }
      return state.concat(Array.from(File.current.files));
    });
  };
  const close = () => {
    setState((state) => ({ ...state, addPost: false }));
  };
  console.log(images);
  return (
    <div className={Styles.npFormWin}>
      <div className={Styles.npFormCont}>
        <div>
          <div className={Styles.closeBtnCont}>
            <button type="button" className={Styles.closeBtn} onClick={close}>
              <i className="fas fa-times" />
            </button>
            <button className={Styles.addPost} type="button">
              Post
            </button>
          </div>
          <div className={Styles.inputTitle}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className={Styles.postTextCont}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={placeholder}
            />
          </div>
          <div className={Styles.addResources}>
            <button className={Styles.addPic} type="button" onClick={() => File.current.click()}>
              <i className="fas fa-images">
                <i className={`fas fa-plus-square ${Styles.plus}`} />
              </i>
              Image
            </button>
          </div>
          <div>
            <p>Added Images</p>
            <div>
              {images
                ? images.map((arr) => {
                    const ImgPath = URL.createObjectURL(arr);
                    return <img src={ImgPath} alt="" />;
                  })
                : null}
            </div>
          </div>
          <input
            ref={File}
            type="file"
            name=""
            onChange={changeImg}
            hidden
            accept="image/jpeg, image/png, image/gif"
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default newPostForm;
