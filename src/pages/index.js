// import Link from "next/link";
// import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserAuthenAPI from '../API/UserAuthen';

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    const authen = async () => {
      const status = await UserAuthenAPI.authen();
      if (status.done) {
        Router.push('/App/Post');
      } else {
        Router.push('/Userauth/Login');
      }
    };
    authen();
  }, [Router]);
  return <div />;
}
