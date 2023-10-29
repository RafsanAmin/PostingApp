// import Link from "next/link";
// import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    Router.replace('/dashboard');
  }, []);
  return <div />;
}
