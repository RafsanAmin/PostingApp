/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PostAPI from '../../API/PostsAPI';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import editContext from '../../Contexts/EditContext';
import useResizeTrigger from '../../hooks/useResizeTrigger';
import Styles from '../../scss/phandleui.module.scss';
import { Reducer, initialState } from '../../state/imageHandlerState';
import fileValidator from '../../utils/fileValidator';
import FileDragHandler from '../fileDragHandler/fileDragHandler';
import TextArea from '../textarea';
import BottomBar from './bottomBar';
import ImagePreview from './imagePreview';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const newNeditPostForm = () => {
  const [postText, setPostText] = useState('');
  const [images, setImages] = useReducer(Reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPost, setOldPost] = useState({ user: '', oldPhotos: [] });
  const [state, setState] = useContext(editContext);
  const [s, setAppState] = useContext(AppContext);
  const [small, setSmall] = useState(false);
  const toggleState = useState(false);
  const [toggle, setToggle] = toggleState;
  const Alert = useContext(AlertContext);
  const File = useRef(null);
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
        setState({ type: 'PF_0' });
        setTimeout(() => {
          setAppState({ type: 'FULL_RELOAD', addPost: false });
        }, 3000);
      } else {
        await PostAPI.addPost({
          text: postText,
          images: images.images,
          date: `${time.toLocaleTimeString()} ${time.toLocaleDateString()} - ${
            days[time.getDay()]
          }`,
          grpID: s.grpID,
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
        setState({ type: 'PF_0' });
        setTimeout(() => {
          setAppState({ type: 'FULL_RELOAD', addPost: false });
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

  const changeImg = async () => {
    try {
      setToggle(true);
      const { files } = File.current;
      const accessType = ['image/png', 'image/jpeg', 'image/gif'];
      const clearedFiles = await fileValidator(
        files,
        accessType,
        25,
        5,
        'Only PNG, JPEG and GIF Files are allowed.'
      );
      setImages({ type: 'ADD', images: clearedFiles });
    } catch (err) {
      Alert({
        title: 'Stop!',
        desc: err,
        type: 'error',
        state: true,
      });
    }
  };
  const close = !isLoading
    ? () => {
        setState({ type: 'PF_0' });
        setPostText('');
        setImages({ type: 'CLEAR' });
      }
    : () => {};

  const delImg = (e) => {
    setImages({ type: 'DELETE', index: e.target.name });
  };

  useResizeTrigger(
    () => {
      if (window.innerWidth <= 500) {
        setSmall(window.innerHeight);
      } else {
        setSmall(false);
      }
    },
    [],
    true
  );
  return (
    <div
      className={`${Styles.npFormWin} ${
        state.addPost || state.editPost.state ? Styles.on : Styles.off
      }`}
    >
      <FileDragHandler
        className={Styles.npFormCont}
        text={
          <>
            Drag your Photos Here! Max 5 Photos. <br /> Only PNG, JPEG and GIF Files are allowed.
          </>
        }
        handler={async (files) => {
          try {
            const accessType = ['image/png', 'image/jpeg', 'image/gif'];
            const clearedFiles = await fileValidator(
              files,
              accessType,
              25,
              5,
              'Only PNG, JPEG and GIF Files are allowed.'
            );

            setImages({ type: 'ADD', images: clearedFiles });
          } catch (err) {
            Alert({
              title: 'Stop!',
              desc: err,
              type: 'error',
              state: true,
            });
          }
        }}
      >
        <div className={`${Styles.inner}`}>
          <div className={Styles.postTextCont}>
            <TextArea
              rows={{
                lineH: 24,
                min:
                  toggle && images.images.length > 0
                    ? small
                      ? (window.innerHeight - 520) / 24
                      : 2
                    : small
                    ? (window.innerHeight - (images.images.length > 0 ? 170 : 112)) / 24
                    : 7,
                max:
                  toggle && images.images.length > 0
                    ? small
                      ? (window.innerHeight - 463) / 24
                      : 3
                    : small
                    ? (window.innerHeight - (images.images.length > 0 ? 170 : 112)) / 24
                    : 10,
              }}
              value={postText}
              setValue={setPostText}
              placeholder={placeholder}
              limit={6000}
              update={toggle}
            />
          </div>
          <ImagePreview Styles={Styles} image={images} delImg={delImg} toggleState={toggleState} />
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
      </FileDragHandler>
    </div>
  );
};

export default newNeditPostForm;
