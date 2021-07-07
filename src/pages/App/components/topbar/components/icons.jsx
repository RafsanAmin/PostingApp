/* eslint-disable consistent-return */
import Link from 'next/link';
import { useContext, useState } from 'react';
import PageInfoContext from '../../../../../Contexts/PageInfoContext';

function Icons(props) {
  const { Styles } = props;
  const [toggle, setToggle] = useState(false);
  const pageName = useContext(PageInfoContext);

  const activeSelector = (name) => {
    if (pageName.name === name) {
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
          <i className="fas fa-align-left" />
        </button>
      </div>
      <div className={`${Styles.icons} ${toggle ? Styles.on : Styles.off}`}>
        <Link href="/App/Post">
          <div className={`${Styles.button} ${activeSelector('post')}`}>
            <i className="fas fa-file-invoice" />
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
