/* eslint-disable consistent-return */
import Link from 'next/link';
import { useContext, useState } from 'react';
import AppContext from '../../../../../Contexts/AppContext';

function Icons(props) {
  const { Styles } = props;
  const [toggle, setToggle] = useState(false);
  const { state } = useContext(AppContext);
  console.log(state);
  const activeSelector = (name) => {
    if (state.name === name) {
      return Styles.active;
    }
    return Styles.none;
  };
  console.log(toggle);
  const toggler = () => {
    setToggle(!toggle);
  };
  return (
    <div className={Styles.iconsContainer}>
      <div className={Styles.toggler}>
        <button type="button" onClick={toggler}>
          {toggle ? <i className="fas fa-times" /> : <i className="fas fa-align-left" />}
        </button>
      </div>
      <div className={`${Styles.icons} ${toggle ? Styles.on : Styles.off}`}>
        <Link href="/App/Post">
          <div className={`${Styles.button} ${activeSelector('post')}`}>
            <img width="28" src="/posts.svg" alt="" />

            <p type="button" name="post">
              Post
            </p>
          </div>
        </Link>
        <Link href="/App/Chat">
          <div className={`${Styles.button} ${activeSelector('chat')}`}>
            <i className="far fa-comment-dots" />
            <p type="button" name="chat">
              Chat
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className={`${Styles.button} ${activeSelector('myProfile')}`}>
            <i className="far fa-user" />
            <p type="button" name="myProfile">
              Profile
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Icons;
