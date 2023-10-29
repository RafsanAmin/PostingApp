import React, { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';
import Styles from '../../scss/grpInfo.module.scss';
import Text from '../text';
import Field from '../userProfile/profile/field';

const ProfileCard = () => {
  const [appState] = useContext(AppContext);
  return (
    <section className={Styles.cont}>
      <div className={Styles.innerCont}>
        <Field
          styles={{ justifyItems: 'start', alignItems: 'start' }}
          field="Description"
          icon={<i className="fas fa-info-circle" />}
          text={<Text text={appState.grpInfo.desc || ''} />}
        />
        <Field
          styles={{ justifyItems: 'start', alignItems: 'start' }}
          field="Members"
          icon={<i className="fa fa-users" aria-hidden="true" />}
          text={<Text text={appState.grpInfo.members.length || ''} />}
        />
      </div>
      <div className={Styles.innerCont}>
        <div className={Styles.memberList}>
          <h2>Member List</h2>
          {appState.grpInfo.members.map((arr) => (
            <>
              <div className={Styles.item}>
                <img
                  src={`https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/d_user.png/profilepic/${arr.uid._id}`}
                  alt=""
                />
                <p>{arr.uid.username}</p>
                <span>
                  {arr.isAdmin ? (
                    <i title="Admin" className="fa-solid fa-screwdriver-wrench" />
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
