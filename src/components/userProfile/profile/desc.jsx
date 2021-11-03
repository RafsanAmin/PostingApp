import React, { useContext } from 'react';
import UserContext from '../../../Contexts/UserContext';
import Field from './field';

const Desc = ({ Styles }) => {
  const { email, bDay, work } = useContext(UserContext);
  return (
    <section className={Styles.descCont}>
      <div className={Styles.inner}>
        <Field field="Email" text={email} icon={<i className="far fa-envelope" />} />
        <Field
          field="Birthday (YYYY-MM-DD)"
          text={bDay || ''}
          icon={<i className="fas fa-birthday-cake" />}
        />
        <Field field="Workplace" text={work} icon={<i className="fas fa-briefcase" />} />
      </div>
    </section>
  );
};

export default Desc;
