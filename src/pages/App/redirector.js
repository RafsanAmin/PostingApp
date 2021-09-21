// import Link from "next/link";
// import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { push, query } = useRouter();
  useEffect(() => {
    // push('/App/Post');
  }, [push]);
  return (
    <div>
      <Link href="/App/Post">Bello</Link>
    </div>
  );
}
