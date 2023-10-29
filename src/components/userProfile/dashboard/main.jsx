import React from 'react';
import Grouplist from '../../Grouplists/grouplist';
import Header from '../../header/header';
import Navigator from '../../navigator';
import Postlist from '../../posts/postlist';
import ProfileCard from '../profile/profileCard';
import UserSetUICont from '../userSetUI/userSetUICont';

const Dashboard = ({ user, own }) => (
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
            <Postlist type="user" user={user._id} />
          </div>
        ),
      },
      ...(own
        ? [
            {
              text: 'Groups',
              icon: <i className="fa-solid fa-users" />,
              comp: (
                <div className="width_fix">
                  <Header type="group" />
                  <Grouplist list={user.groups} />
                </div>
              ),
            },
            {
              text: 'Settings',
              icon: <i className="fa-solid fa-gears" />,
              comp: <UserSetUICont user={user} />,
            },
          ]
        : []),
    ]}
  />
);

export default Dashboard;
