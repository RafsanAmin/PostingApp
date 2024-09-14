import Styles from '../scss/error.module.scss';

const Error = ({ type }) => {
  const error = () => {
    if (type === '404') {
      return { code: '404', text: 'Not Found', desc: 'Your Requested thing has not been found.' };
    }

    if (type === '500') {
      return {
        code: '500',
        text: 'Server Error',
        desc: 'There is an error in server. Report to the developer team to fix.',
      };
    }
    if (type === '401') {
      return {
        code: '401',
        text: 'Unauthorized',
        desc: 'You must be logged in or it is a admin page.',
      };
    }
    if (type === '403g') {
      return {
        code: '403',
        text: 'Unauthorized',
        desc: 'You are not joined in this group',
      };
    }
    if (type === 'off') {
      return {
        code: 'Offline!',
        text: 'You are offline.',
        desc: 'You have to be online to access this page',
      };
    }
  };
  const { code, text, desc } = error();
  return (
    <>
      <div className={Styles.errorCont}>
        <div className={Styles.icon}>
          <i className="fas fa-times-circle" />
        </div>
        <h1>
          <span>{code}</span> {text}
        </h1>
        <p>{desc}</p>
      </div>
    </>
  );
};
export default Error;
