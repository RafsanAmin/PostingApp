/* eslint-disable react-hooks/rules-of-hooks */

const Opt = (props) => {
  const { Styles, data } = props;

  return (
    <>
      <button className={Styles.addPostCont} type="button" onClick={data.trigger}>
        <div className={`${Styles.image} ${data.icon[1] !== 'sub' && Styles.maskfix}`}>
          {data.img ? <img className={Styles.img} src={data.img} alt="" /> : ''}
          {data.icon ? (
            <i
              className={`${data.icon[0]} ${data.icon[1] === 'sub' ? Styles.i : `${Styles.img}`}`}
            />
          ) : (
            ''
          )}
        </div>
        <div className={Styles.text}>
          <p>{data.text}</p>
        </div>
      </button>
    </>
  );
};
export default Opt;
