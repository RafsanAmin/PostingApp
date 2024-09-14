// import Link from "next/link";
// import Image from "next/image";
import { useRouter } from 'next/router';
import useUserInfo from '../hooks/useUserInfo';

export default function Home() {
  const Router = useRouter();
  useUserInfo((status) => {
    if (status.done) {
      Router.replace('/dashboard');
    } else {
      Router.replace('/home');
    }
  }, []);
  return <div />;
}
