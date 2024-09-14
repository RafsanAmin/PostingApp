import React, { useContext, useReducer, useState } from 'react';
import groupAPI from '../../API/groupAPI';
import AlertContext from '../../Contexts/AlertContext';
import AppContext from '../../Contexts/AppContext';
import editContext from '../../Contexts/EditContext';
import Styles from '../../scss/userSetUICont.module.scss';
import Input from '../Input';
import TextArea from '../textarea';
import ProfilePicHandle from '../userProfile/userSetUI/profilePicHandle';

const initialState = {
  desc: '',
  pfp: null,
  delPFP: false,
  name: '',
};

const AddGroup = () => {
  const [editState, ss] = useContext(editContext);
  const [, a] = useContext(AppContext);
  const [loading, setLoad] = useState();
  const Alert = useContext(AlertContext);
  const [grpDetail, dispatchGrpDetail] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.text };
      case 'SET_IMG':
        return { ...state, pfp: action.file, delPFP: false };
      case 'DEL_IMG':
        return { ...state, pfp: null, delPFP: true };
      case 'CLOSE':
        return initialState;
      default:
        return state;
    }
  }, initialState);
  const createGroup = async () => {
    setLoad(true);
    groupAPI
      .createGroup(grpDetail)
      .then(() => {
        Alert({
          state: true,
          title: 'Successful!',
          desc: 'Successfully Created Group',
          type: 'success',
        });
        setLoad(false);
        a({ type: 'FULL_RELOAD' });
        ss({ type: 'PF_0' });
        dispatchGrpDetail({ type: 'CLOSE' });
      })
      .catch((err) => {
        Alert({
          state: true,
          title: 'Error!',
          desc: JSON.stringify(err),
          type: 'error',
        });
        setLoad(false);
      });
  };
  const setF = (f, t) => {
    dispatchGrpDetail({ type: 'SET_FIELD', field: f, text: t });
  };
  return (
    <>
      <div className={`${editState.addGroup ? Styles.on : Styles.off} ${Styles.win}`}>
        <div style={{ padding: 'clamp(1rem, 2.5vw, 2rem)' }} className={`${Styles.cont}`}>
          <div className={`${Styles.close}`}>
            <button onClick={() => ss({ type: 'PF_0' })} type="button">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className={Styles.head}>
            <h3>Create Group</h3>
          </div>
          <div className={Styles.agGrid}>
            <ProfilePicHandle styles={Styles} State={[grpDetail, dispatchGrpDetail]} />
            <div>
              <div className={Styles.inputCont}>
                <span>Name</span>{' '}
                <Input
                  value={grpDetail.name}
                  setValue={(d) => {
                    setF('name', d);
                  }}
                  type="input"
                  name="Name"
                  limit={36}
                />
              </div>
              <div className={`${Styles.inputCont} ${Styles.fullLine}`}>
                <span>Description</span>
                <br />
                <TextArea
                  limit={250}
                  rows={{ min: 5, max: 5, lineH: 24 }}
                  value={grpDetail.desc}
                  setValue={(d) => setF('desc', d)}
                  placeholder="Description"
                  style={{ paddingTop: '1rem' }}
                />
              </div>
            </div>
          </div>
          <div className={`${Styles.updateButton} ${loading ? 'load' : ''}`}>
            <div />
            <button type="button" onClick={createGroup}>
              {loading ? <img src="/loadingW.svg" width="20" alt="" /> : null}
              Create Group
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGroup;
