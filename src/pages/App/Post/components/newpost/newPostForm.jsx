import { useContext, useRef, useState } from 'react';
import AppContext from '../../../../../Contexts/AppContext';
import Styles from './scss/npform.module.scss';

const newPostForm = () => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [imgPath, setImgPath] = useState('');
  const { setState } = useContext(AppContext);
  const File = useRef(null);
  const placeholder = 'Write Your Thoughts Here';
  const changeImg = () => {
    setImgPath(URL.createObjectURL(File.current.files[0]));
  };
  const close = () => {
    setState((state) => ({ ...state, addPost: false }));
  };
  return (
    <div className={Styles.npFormWin}>
      <div className={Styles.npFormCont}>
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
          <button type="button" onClick={() => File.current.click()}>
            <i className="fas fa-images    " />
            Add Image
          </button>
        </div>
        <input
          ref={File}
          type="file"
          name=""
          onChange={changeImg}
          hidden
          accept="image/jpeg, image/png"
        />
        <img src={imgPath} alt="" />
      </div>
    </div>
  );
};

export default newPostForm;
