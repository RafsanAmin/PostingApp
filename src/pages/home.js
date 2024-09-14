import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import TopBar from '../components/topbar/topbar';
import useUserInfo from '../hooks/useUserInfo';
import Styles from '../scss/home.module.scss';

const Page = () => {
  const [user, setUser] = useState(false);
  useUserInfo((info) => {
    if (info.done) {
      setUser(true);
    }
  }, []);
  return (
    <div className={Styles.cont}>
      <Head>
        <title>Rafpost - Home</title>
      </Head>
      <TopBar hero />
      <div>
        <div className={Styles.hero}>
          <div className={Styles.text}>
            <div className={Styles.tag}>RafPost</div>
            <h1 className="">
              Post, <span className={Styles.span1}>Chat</span>, Connect <br /> &{' '}
              <span className={Styles.span2}>Share</span>{' '}
              <span className={Styles.span3}>Effortlessly</span>!
            </h1>
            <p>
              Seamlessly connect and share with group chats and posts. Stay in the loop effortlessly
              with RafPost!
            </p>
            <div>
              <Link href="/Userauth/Login">
                <button type="button">
                  <Link href="/Userauth/Signup">SignUp</Link>
                </button>
              </Link>

              {user ? (
                <Link href="/User/own">
                  <button type="button">Go to App</button>
                </Link>
              ) : (
                <Link href="/Userauth/Login">
                  <button type="button">Login</button>
                </Link>
              )}
            </div>
          </div>

          {/* <img src="/hero/1.svg" alt="" /> */}
          <img src="/hero/2.svg" alt="" />
        </div>

        <div className={Styles.pointsCont}>
          <h1 className="">
            <span className={Styles.span1}>Features</span> You will{' '}
            <span className={Styles.span3}>Love!</span>
          </h1>
          <p className="">These are the features you find in this app.</p>
          <div className={Styles.points}>
            <div>
              <div>
                <i className="fa-solid fa-users" />
              </div>
              <h3>Groups</h3>
              <p>
                With RafPost, you can join private groups to stay connected with your close circle.
                Share your moments by posting photos and enjoy seamless chats with friends.
                Additionally, explore and view personal posts from other users to stay updated on
                their latest activities.
              </p>
            </div>
            <div>
              <div>
                <i className="fa-regular fa-address-card" />
              </div>
              <h3>Posts</h3>
              <p>
                You can post in groups or personal feed where you can upload your photos what
                everyoin can see
              </p>
            </div>
            <div>
              <div>
                <i className="fa-regular fa-comment-dots" />
              </div>
              <h3>Chats</h3>
              <p>
                Chat with your fellow group members to save conversations and build connections.
              </p>
            </div>
          </div>
        </div>
        <div className={`${Styles.pointsCont} ${Styles.ssC}`}>
          <h1 className="">
            "<span className={Styles.span1}>Invisible </span> threads are the{' '}
            <span className={Styles.span3}>strongest</span> ties."{' '}
          </h1>
          <p className="">- Friedrich Nietzsche</p>
          <div className={Styles.ss}>
            <img src="/ss/ss1.png" alt="" />
            <img src="/ss/ss2.png" alt="" />
            <img src="/ss/ss3.png" alt="" />
          </div>
        </div>

        <div className={Styles.pointsCont}>
          <h1 className="">
            <span className={Styles.span1}>Video</span> Demo to{' '}
            <span className={Styles.span3}>Explore!</span>
          </h1>
          <p className="">A explained tutorial to this app.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Hyh3F4buWEc?si=wjLJnq6KUkHYZsJs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className={`${Styles.pointsCont} ${Styles.dev} ${Styles.ssC}`}>
          <h1 className="">
            <span className={Styles.span1}>Developer</span>{' '}
            <span className={Styles.span3}>Introduction</span>
          </h1>
          <p className="">Person who worked hard for the project.</p>
          <div>
            <img alt="" src="/dev.png" />
            <div>
              <h3>
                HRM <span className={Styles.span}>Rafsan</span> Amin
              </h3>
              <div
                style={{
                  marginBlock: '.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem',
                }}
              >
                <img
                  style={{ width: '25px', height: '27px', flexBasis: '25px', flexGrow: 0 }}
                  src="ndc.svg"
                  alt=""
                />{' '}
                Notre Dame College <span className={Styles.span1}>12th Grade</span>
              </div>
              <p>
                This project taught me invaluable lessons about perseverance and connection which I
                haven't learnt from my any aspect of life. This app will help you effortlessly
                connect with your people, whether you’re sharing moments, chatting with friends, or
                staying updated with your groups.
              </p>
              <div className={Styles.conn}>
                <h2>Connections</h2>
                <div>
                  <a href="https://github.com/RafsanAmin">
                    <i className="fa-brands fa-github" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100082305411559">
                    <i className="fa-brands fa-facebook" />
                  </a>
                  <a href="https://rafsanamin.epizy.com/?i=1">
                    <i className="fa-solid fa-earth-asia" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className={Styles.footer}>
          <div>
            <img style={{ paddingRight: '0.5rem' }} src="/posts.svg" alt="" width="40" />
            <h1> Rafpost</h1>
          </div>
          <a href="https://github.com/RafsanAmin/PostingApp">
            <i className="fa-brands fa-github" />
            Click to See Code
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Page;
