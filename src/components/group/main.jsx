import React from 'react';
import Header from '../header/header';
import Navigator from '../navigator';
import Postlist from '../posts/postlist';
import ProfileCard from './profileCard';

const Main = ({ grpInfo }) => (
  <Navigator
    list={[
      {
        text: 'Info',
        icon: <i className="fa-solid fa-circle-info" />,
        comp: (
          <>
            <ProfileCard />
          </>
        ),
      },
      {
        text: 'Posts',
        icon: <img src="/posts.svg" alt="" />,
        comp: (
          <div className="width_fix">
            <Header type="post" />
            <Postlist grpID={grpInfo._id} type="latest" />
          </div>
        ),
      },
      {
        text: 'Chat',
        icon: <i className="far fa-comment-dots" />,
        comp: (
          <div style={{ width: '100%', display: 'grid', placeItems: 'center', minHeight: '250px' }}>
            <h2>Feature Coming Soon!</h2>
          </div>
        ),
      },
      //   {
      //     text: 'Settings',
      //     icon: <i className="fa-solid fa-gears" />,
      //     comp: (
      //       <div style={{ width: '100%', display: 'grid', placeItems: 'center', minHeight: '250px' }}>
      //         <h2>Feature Coming Soon!</h2>
      //       </div>
      //     ),
      //   },
      // ]}}
    ]}
  />
);

export default Main;
