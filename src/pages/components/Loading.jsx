import Styles from './scss/loading.module.scss';

const Loading = (props) => {
  console.log(props);
  const { classP, contClass, loadState, children } = props;
  return (
    <>
      <div className={loadState ? `${Styles.loadingCont} ${classP}-load-cont` : Styles.loadNone} />
      <div className={`${contClass} ${loadState ? Styles.loading : ''}`}>{children}</div>
    </>
  );
};

export default Loading;
