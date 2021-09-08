const BottomBar = ({ props }) => {
  const { Styles, isLoading, PostHandle, close, File, isEdit } = props;
  return (
    <>
      <div className={Styles.bottomBar}>
        <div className={Styles.addResources}>
          <button className={Styles.addPic} type="button" onClick={() => File.current.click()}>
            <i className="fas fa-images">
              <i className={`fas fa-plus-square ${Styles.plus}`} />
            </i>
          </button>
        </div>
        <div className={Styles.btnCont}>
          <button
            className={`${Styles.closeBtn} ${isLoading ? Styles.disable : ''}`}
            type="button"
            onClick={close}
            disabled={isLoading}
          >
            <i className="fas fa-times" />
          </button>
          <button
            className={`${Styles.addPost} ${isLoading ? Styles.disable : ''}`}
            type="button"
            onClick={PostHandle}
            disabled={isLoading}
          >
            <div>
              {isLoading ? <img style={Styles.load} src="/loadingW.svg" alt="" /> : null}
              <p>{isEdit ? 'Edit' : 'Post'}</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
export default BottomBar;
