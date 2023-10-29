import Link from 'next/link';
import React, { useContext } from 'react';
import groupAPI from '../../API/groupAPI';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import Style from '../../scss/grouplist.module.scss';
import { Item, Menu, MenuCont } from '../menu';
import DeleteBtn from '../posts/dbtn';

const Grouplist = ({ list }) => {
  const [, ss] = useContext(AppContext);
  const Alert = useContext(AlertContext);
  return (
    <div className={Style.cont}>
      {list.map(({ name, _id }) => (
        <Link href={`/groups/${_id}/`}>
          <div className={Style.card}>
            <div className={Style.pfp}>
              <img
                src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${_id}`}
                alt="profile-pic"
              />
            </div>
            <p>{name}</p>
            <MenuCont>
              <Menu>
                <Item
                  name="Exit"
                  icon={<i className="fa-solid fa-trash-can" />}
                  handler={(e) => {
                    e.stopPropagation();

                    Alert({
                      state: true,
                      title: 'Sure?',
                      desc: 'Are you sure want to Delete?',
                      type: 'warn',
                      button: (
                        <DeleteBtn
                          func={() => {
                            groupAPI
                              .exitGroup(_id)
                              .then(() => {
                                ss({ type: 'FULL_RELOAD' });
                                Alert({ state: false });
                              })
                              .catch(() => {
                                ss({ type: 'FULL_RELOAD' });
                                Alert({ state: false });
                              });
                          }}
                        />
                      ),
                    });
                  }}
                />
                <Item name="Share" icon={<i className="fa-solid fa-share" />} />
              </Menu>
            </MenuCont>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Grouplist;
