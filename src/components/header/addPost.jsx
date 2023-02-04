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
        <div className={Styles.image}>
          <img className={Styles.img} src="/posts.svg" alt="" />
          <i className={`fas fa-plus-circle ${Styles.i}`} />
        </div>
        <div className={Styles.text}>
          <p>
            Create
            <br /> Post
          </p>
        </div>
      </button>
    </>
  );
};
export default addPost;
