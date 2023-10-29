import Link from 'next/link';
import { memo, useContext } from 'react';
import postAPI from '../../API/PostsAPI';
import urlPrefix from '../../API/getURL';
import Context from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/postc.module.scss';
import Clipboard from '../clipboard';
import { Item, Menu, MenuCont } from '../menu';
import Text from '../text';
import DeleteBtn from './dbtn';
import ImageView from './imageView';

const PostCont = ({ post, setEditPost }) => {
  const { text, uid, photos, date, _id } = post;
  const Alert = useContext(Context);
  const ContextItem = useContext(AppContext);

  const { _id: puid, username } = uid || { _id: 'undefined', username: 'Deleted User' };
  const imgPath = `https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${puid}`;
  const [appState, ss] = ContextItem || [
    { userid: null },
    () => {
      window.location.reload();
    },
  ];

  const { userid } = appState;
  const own =
    userid === puid ||
    userid === '61346cba5f69790468c69b2d' ||
    userid === '614ca3dadca93a001614286a';

  let textSizeIsBig = false;
  if (text.length > 120) {
    textSizeIsBig = true;
  }

  const share = () => {
    Alert({
      state: true,
      title: 'Share',
      desc: (
        <>
          Click The Button to Copy and Share The Link
          <Clipboard style={{ marginTop: '0.8rem' }} copyText={`${urlPrefix}/Posts/${_id}`} />
        </>
      ),
      type: 'info',
      cIcon: <i className="fas fa-share" />,
    });
  };
  const deletePostConf = async () => {
    document.body.style.cursor = 'wait';
    try {
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
        state: true,
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
    setEditPost({ type: 'EP_1', post });
  };
  return (
    <div className={Styles.postCont}>
      <div className={Styles.titleCont}>
        <Link href={userid === puid ? '/User/own' : `/User/${puid}`} prefetch={false}>
          <div style={{ cursor: 'pointer' }} className={Styles.left}>
            <div className={Styles.profPic}>
              <img src={imgPath} alt="" />
            </div>
            <div className={Styles.nameNdate}>
              <h3>{username}</h3>
              <p>{date}</p>
            </div>
          </div>
        </Link>
        <div className={Styles.right}>
          <MenuCont>
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
