import { useContext, useEffect, useState } from 'react';
import MenuTogglerContext from '../Contexts/MenuTogglerContext';
import Styles from '../scss/menu.module.scss';

const MenuCont = ({ children, state }) => {
  const [toggle, setToggle] = state || useState(false);
  useEffect(() => {
    window.addEventListener('click', () => {
      setToggle(false);
    });
  }, []);
  return (
    <div className={Styles.toggler}>
      <button
        className={Styles.button}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setToggle((s) => !s);
        }}
      >
        {!toggle ? <i className="fas fa-ellipsis-v" /> : <i className="fas fa-times    " />}
      </button>
      <MenuTogglerContext.Provider value={[toggle, setToggle]}>
        {children}
      </MenuTogglerContext.Provider>
    </div>
  );
};
const Menu = ({ children }) => {
  const [toggle] = useContext(MenuTogglerContext);
  return <div className={`${Styles.menu} ${toggle ? Styles.on : Styles.off}`}>{children}</div>;
};
const Item = ({ icon, name, handler }) => {
  const [, st] = useContext(MenuTogglerContext);
  return (
    <button
      className={Styles.items}
      type="button"
      onClick={() => {
        handler();
        st(false);
      }}
    >
      {icon}
      <p>{name}</p>
    </button>
  );
};

export { MenuCont, Menu, Item };
// eslint-disable-next-line prettier/prettier

