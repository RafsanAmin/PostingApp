/* eslint-disable guard-for-in */
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PostAPI from '../../API/PostsAPI';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/phandleui.module.scss';
import { initialState, Reducer } from '../../state/imageHandlerState';
import TextArea from '../textarea';
import BottomBar from './bottomBar';
import ImagePreview from './imagePreview';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const newNeditPostForm = () => {
  const [postText, setPostText] = useState('');
  const [images, setImages] = useReducer(Reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPost, setOldPost] = useState({ user: '', oldPhotos: [] });
  const [state, setState] = useContext(AppContext);
  const Alert = useContext(AlertContext);
  const File = useRef(null);
  const [isDragging, setIsDragging] = useState();
  const placeholder = 'Write Your Thoughts Here';
  useEffect(() => {
    if (state.editPost.state) {
      const { text, photos, _id } = state.editPost.post;
      setPostText(text);
      setImages({ type: 'ADD', images: photos, Alert });
      setOldPost({ id: _id, oldPhotos: photos });
    }
  }, [Alert, state.editPost]);
  const PostHandle = async () => {
    try {
      setIsLoading(true);
      const time = new Date();
      if (state.editPost.state) {
        const msg = await PostAPI.updatePost({
          ...oldPost,
          text: postText,
          images: images.images,
          date: `${time.toLocaleTimeString()} ${time.toLocaleDateString()} - ${
            days[time.getDay()]
          }`,
        });
        Alert({
          title: 'Successfull!',
          desc: msg,
          type: 'success',
          state: true,
        });
        setIsLoading(false);
        setImages({ type: 'CLEAR' });
        setPostText('');
        setState({ type: 'PF_0', addPost: false });
        setTimeout(() => {
          setState({ type: 'FULL_RELOAD', addPost: false });
        }, 3000);
      } else {
        await PostAPI.addPost({
          text: postText,
          images: images.images,
          date: `${time.toLocaleTimeString()} ${time.toLocaleDateString()} - ${
            days[time.getDay()]
          }`,
        });
        setIsLoading(false);
        setImages({ type: 'CLEAR' });
        setPostText('');
        Alert({
          title: 'Successfull!',
          desc: 'Your Post has been successfully added!',
          type: 'success',
          state: true,
        });
        setState({ type: 'PF_0', addPost: false });
        setTimeout(() => {
          setState({ type: 'FULL_RELOAD', addPost: false });
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      Alert({
        title: 'Error!',
        desc: err,
        type: 'error',
        state: true,
      });
    }
  };
  const changeImg = () => {
    setImages({ type: 'ADD', images: File.current.files, Alert });
  };
  const close = !isLoading
    ? () => {
        setState({ type: 'PF_0' });
        setPostText('');
        setImages({ type: 'CLEAR' });
      }
    : () => {};

  const delImg = (e) => {
    console.log(e.target.name);
    setImages({ type: 'DELETE', index: e.target.name });
  };
  const fileValidator = (fileList, accessType) =>
    new Promise((rs, rj) => {
      const ret = [];
      if (fileList && !(fileList.length <= 0)) {
        for (const ind in fileList) {
          const arr = fileList[ind];
          if (accessType.includes(arr.type)) {
            ret.push(arr);
          } else if (!arr.type) {
            console.log('invalid file!');
          } else {
            rj('Only PNG, JPG and GIF are allowed');
            break;
          }
        }
        rs(ret);
      }
    });
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragExit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrag={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        try {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          const accessType = ['image/png', 'image/jpeg', 'image/gif'];
          const { files } = e.dataTransfer;
          const clearedFiles = await fileValidator(files, accessType);
          console.log(clearedFiles);
          setImages({ type: 'ADD', images: clearedFiles, Alert });
        } catch (err) {
          Alert({
            title: 'Stop!',
            desc: err,
            type: 'error',
            state: true,
          });
        }
      }}
      className={`${Styles.npFormWin} ${
        state.addPost || state.editPost.state ? Styles.on : Styles.off
      }`}
    >
      <div className={Styles.npFormCont}>
        {isDragging ? (
          <div className={isDragging ? Styles.dragOverlay : ''}>
            <i className="fas fa-images" />
            <p>Drag your files Here! Max 5</p>
          </div>
        ) : null}
        <div>
          <div className={Styles.postTextCont}>
            <TextArea
              rows={{ lineH: 24, min: images.images.length > 0 ? 2 : 7, max: 10 }}
              value={postText}
              setValue={setPostText}
              placeholder={placeholder}
              limit={6000}
            />
          </div>
          <ImagePreview Styles={Styles} image={images} delImg={delImg} />
          <input
            ref={File}
            type="file"
            name=""
            onChange={changeImg}
            hidden
            accept="image/jpeg, image/png, image/gif"
            multiple
          />
          <BottomBar
            props={{ Styles, isLoading, PostHandle, close, File, isEdit: state.editPost.state }}
          />
        </div>
      </div>
    </div>
  );
};

export default newNeditPostForm;
