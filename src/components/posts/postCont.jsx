import { memo, useContext, useState } from 'react';
import postAPI from '../../API/PostsAPI';
import Context from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/postcont.module.scss';
import Clipboard from '../clipboard';
import { Item, Menu, MenuCont } from '../menu';
import Text from '../text';
import DeleteBtn from './dbtn';
import ImageView from './imageView';

const PostCont = ({ post }) => {
  const { text, uid, photos, username, date, _id } = post;
  const [toggle, setToggle] = useState(false);
  const imgPath = `/uh/getProfilePic/${uid}`;
  const Alert = useContext(Context);
  const ContextItem = useContext(AppContext);
  const [appState, ss] = ContextItem || [
    { userid: null },
    () => {
      window.location.reload();
    },
  ];
  const { userid } = appState;
  const own = userid === uid;

  let textSizeIsBig = false;
  if (text.length > 120) {
    textSizeIsBig = true;
  }

  const share = () => {
    setToggle(false);
    Alert({
      state: true,
      title: 'Share',
      desc: (
        <>
          Click The Button to Copy and Share The Link
          <Clipboard copyText={`https://rafpost.herokuapp.com/Posts/${_id}`} />
        </>
      ),
      type: 'info',
      cIcon: <i className="fas fa-share" />,
    });
  };
  const deletePostConf = async () => {
    document.body.style.cursor = 'wait';
    try {
      setToggle(false);
      const msg = await postAPI.deletePost({ pid: _id, photos });
      Alert({
        state: true,
        title: 'Deleted',
        desc: msg,
        type: 'success',
      });
      ss({ type: 'FULL_RELOAD' });
      document.body.style.cursor = 'default';
    } catch (err) {
      Alert({
        state: false,
        title: 'Not Deleted',
        desc: err,
        type: 'error',
      });
      document.body.style.cursor = 'default';
    }
  };
  const deletePost = () => {
    Alert({
      state: true,
      title: 'Sure?',
      desc: 'Are you sure want to Delete?',
      type: 'warn',
      button: <DeleteBtn func={deletePostConf} />,
    });
  };
  const editPost = () => {
    ss({ type: 'EP_1', post });
  };
  return (
    <div className={Styles.postCont}>
      <div className={Styles.titleCont}>
        <div className={Styles.left}>
          <div className={Styles.profPic}>
            {/* {uid} */}
            <img src={imgPath} alt="" />
          </div>
          <div className={Styles.nameNdate}>
            <h3>{username}</h3>
            <p>{date}</p>
          </div>
        </div>
        <div className={Styles.right}>
          <MenuCont state={[toggle, setToggle]}>
            <Menu>
              <Item icon={<i className="fas fa-share" />} name="Share" handler={share} />
              {own ? (
                <>
                  <Item icon={<i className="fas fa-trash" />} name="Delete" handler={deletePost} />
                  <Item icon={<i className="fas fa-edit" />} name="Edit" handler={editPost} />
                </>
              ) : null}
            </Menu>
          </MenuCont>
        </div>
      </div>
      <div
        className={`${Styles.text} ${textSizeIsBig ? Styles.big : ''} ${
          photos.length > 0 ? Styles.hi : ''
        }`}
      >
        <Text text={text} />
      </div>
      <ImageView Styles={Styles} photos={photos} />
    </div>
  );
};
export default memo(PostCont);
