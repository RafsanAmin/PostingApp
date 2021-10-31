// import Link from "next/link";
// import Image from "next/image";
import { useRouter } from 'next/router';
import useUserInfo from '../hooks/useUserInfo';

export default function Home() {
  const Router = useRouter();
  useUserInfo((status) => {
    if (status.done) {
      Router.replace('/App/Post');
    } else {
      Router.replace('/Userauth/Login');
    }
  }, []);
  return <div />;
}
