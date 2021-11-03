import React, { useContext } from 'react';
import UserContext from '../../../Contexts/UserContext';
import Field from './field';

const Bio = ({ Styles }) => {
  const { bio } = useContext(UserContext);
  return (
    <section className={Styles.bioCont}>
      <div className={Styles.inner}>
        <Field
          styles={{ height: '100%', justifyItems: 'start', alignItems: 'start' }}
          field="Bio"
          icon={<i className="fas fa-info-circle" />}
          text={bio}
        />
      </div>
    </section>
  );
};

export default Bio;
