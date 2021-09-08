/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';

const addPost = (props) => {
  const { Styles } = props;
  const [, setState] = useContext(AppContext);
  const addPostTrigger = () => {
    setState({ type: 'AP_1' });
  };
  return (
    <>
      <button className={Styles.addPostCont} type="button" onClick={addPostTrigger}>
        <div className={Styles.text}>
          <i className="fas fa-plus-circle" />
          <p>Add Post</p>
        </div>
        <img className={Styles.image} src="/posts.svg" alt="" />
      </button>
    </>
  );
};
export default addPost;
