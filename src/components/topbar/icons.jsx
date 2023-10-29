/* eslint-disable consistent-return */
import Link from 'next/link';

function Icons(props) {
  const { Styles } = props;
  return (
    <div className={Styles.iconsContainer}>
      <div className={`${Styles.icons}`}>
        <Link href="/dashboard">
          <div className={`${Styles.button}`}>
            <i className="fa-solid fa-arrow-left" />
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Icons;
