/* eslint-disable no-nested-ternary */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUserInfo from '../../../../hooks/useUserInfo';

import groupAPI from '../../../../API/groupAPI';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/error';

// AP_S = new post form state
const PostApp = ({ grpID }) => {
  const { push } = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useUserInfo(async (status) => {
    setLoading(true);
    if (status.done) {
      groupAPI
        .joinGroup(grpID)
        .then(() => {
          push(`/groups/${grpID}`);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          if (err.notfound) {
            push('/404');
          } else {
            push('/500');
          }
        });

      return 0;
    }
    push('/Userauth/Login');
  }, []);

  return (
    <>
      <Head>
        <title>Rafpost - Postapp</title>
      </Head>
      <div>{loading ? <Loading /> : error ? <Error type="500" /> : ''}</div>
    </>
  );
};
PostApp.getInitialProps = async ({ query }) => {
  try {
    return { grpID: query.grpID, error: false };
  } catch (error) {
    return { error, post: null };
  }
};
export default PostApp;
