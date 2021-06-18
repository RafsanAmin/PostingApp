/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react';

function TopBar() {
  const [toggled, setToggled] = useState(false);
  const toggle = () => {
    if (toggled) {
      setToggled(false);
    } else {
      setToggled(true);
    }
  };
  return (
    <nav className="navbar">
      <div>
        <h1>RafPost</h1>
      </div>
      <div className={toggled ? 'toggled nav_link' : 'nav_link'}>
        <ul>
          <li>
            <a href="https://google.com" target="_blank">
              Home
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              Add
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              Delete
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              Hello
            </a>
          </li>
        </ul>
      </div>
      <div className="nav_toggler">
        <button type="button" onClick={toggle}>
          {toggled ? ' X ' : ' _ '}
        </button>
      </div>
    </nav>
  );
}

export default TopBar;
