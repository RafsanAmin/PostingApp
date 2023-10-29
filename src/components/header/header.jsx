import { useContext, useRef } from 'react';
import groupAPI from '../../API/groupAPI';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import editContext from '../../Contexts/EditContext';
import Styles from '../../scss/header.module.scss';
import DuoIcon from '../DuoIcon';
import Input from '../Input';
import Opt from './opt';

const Header = ({ type }) => {
  const [, setState] = useContext(editContext);
  const [, setAppState] = useContext(AppContext);
  const a = useContext(AlertContext);
  const ref = useRef();
  const ref1 = useRef();
  const ref3 = useRef();
  const joinGroup = async () => {
    ref1.current.innerText = 'Joining';
    ref1.current.disabled = true;
    ref1.current.style.opacity = '0.8';
    groupAPI
      .joinGroup(ref.current.value)
      .then(() => {
        setAppState({ type: 'FULL_RELOAD' });
        ref1.current.innerText = 'Join';
        ref1.current.disabled = false;
        ref1.current.style.opacity = '1';
        a({ state: false });
      })
      .catch((msg) => {
        ref1.current.innerText = 'Join';
        ref1.current.disabled = false;
        ref1.current.style.opacity = '1';
        ref3.current.style.backgroundColor = 'rgba(255, 0,0,0.1)';
        ref3.current.style.padding = '0.5rem';
        ref3.current.innerText = msg;
      });
  };

  const types = {
    group: [
      {
        text: (
          <>
            {' '}
            Create
            <br /> Group
          </>
        ),
        img: '/cg.svg',
        icon: ['fas fa-plus-circle', 'sub'],
        trigger: () => {
          setState({ type: 'AG_1' });
        },
      },
      {
        text: (
          <>
            <p>
              Join <br /> Group
            </p>
          </>
        ),
        icon: ['fa-solid fa-chain'],
        trigger: () => {
          a({
            state: 'true',
            title: 'Join Group',
            desc: (
              <>
                <p style={{ marginBottom: '.6rem' }}>Please Write the ID of the group to join.</p>

                <Input
                  style={{
                    margin: '0',
                  }}
                  name="Group ID"
                  limit={64}
                  ref={ref}
                />
                <p
                  style={{
                    marginBlock: '1rem',
                    color: 'rgba(255,0,0,0.6)',
                    backgroundColor: '#fff',
                    padding: '0',
                    borderRadius: '5px',
                  }}
                  ref={ref3}
                />
              </>
            ),
            type: 'info',
            button: (
              <button
                type="button"
                onClick={() => {
                  joinGroup();
                }}
                ref={ref1}
              >
                Join
              </button>
            ),
            cIcon: (
              <DuoIcon
                main="fa-solid fa-user-group"
                child="fa-solid fa-circle-plus"
                pos={[30, 30]}
                msk
              />
            ),
          });
        },
      },
    ],
    post: [
      {
        text: (
          <>
            {' '}
            Create
            <br /> Post
          </>
        ),
        img: '/posts.svg',
        icon: ['fas fa-plus-circle', 'sub'],
        trigger: () => {
          setState({ type: 'AP_1' });
        },
      },
      {
        text: (
          <>
            <p>
              Reload <br /> Posts
            </p>
          </>
        ),
        icon: ['fa-solid fa-rotate-right'],
        trigger: () => {
          setAppState({ type: 'FULL_RELOAD' });
        },
      },
    ],
  };
  return (
    <div className={Styles.headerCont}>
      <div>
        <Opt Styles={Styles} data={types[type][0]} />
        <Opt Styles={Styles} data={types[type][1]} />
        {/* <AddPost Styles={Styles} /> */}
      </div>
    </div>
  );
};
export default Header;
