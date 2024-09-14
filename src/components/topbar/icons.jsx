/* eslint-disable consistent-return */
import Link from 'next/link';
import { useRouter } from 'next/router';

function Icons(props) {
  const { Styles } = props;
  const Router = useRouter();
  return (
    <div className={Styles.iconsContainer}>
      <div className={`${Styles.icons}`}>
        <Link href="/dashboard">
          <div className={`${Styles.button}`}>
            <i className="fa-solid fa-table-columns" />
          </div>
        </Link>
        <div
          onClick={() => {
            Router.back();
          }}
        >
          <div className={`${Styles.button}`}>
            <i className="fa-solid fa-arrow-left" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Icons;
