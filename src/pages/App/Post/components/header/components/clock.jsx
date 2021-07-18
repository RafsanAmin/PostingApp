import { useEffect, useState } from 'react';

const Clock = (props) => {
  const { Styles } = props;
  const [time, setTime] = useState(new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    const clockTicker = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(clockTicker);
    };
  });
  return (
    <div className={Styles.clockContP}>
      <i className="far fa-clock" />
      <h1>{time.toLocaleTimeString()}</h1>
      <h3>{`${time.toLocaleDateString()} - ${days[time.getDay()]}`}</h3>
    </div>
  );
};
export default Clock;
