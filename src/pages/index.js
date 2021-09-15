// import Link from "next/link";
// import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserAuthenAPI from '../API/UserAuthen';

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    const authen = async () => {
      console.log(Router);
      const status = await UserAuthenAPI.authen();
      if (status.done) {
        Router.replace('/App/Post');
      } else {
        Router.replace('/Userauth/Login');
      }
    };
    authen();
  }, [Router]);
  return <div />;
}
