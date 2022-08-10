import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/CheckPage';
import './video.css';
import { ReactComponent as Scanner } from './scanner.svg';
import history from '../../../history';
import { message } from 'antd';

function CheckPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, pending } = useSelector(state => state.checkPage);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!history.location.state) {
      history.push('ticket/checkenter');
    }
    console.log(count);
    // console.log('history.location.state:', history.location.state); //result: '{date: 'OB', cam: 'environment'}'
    // console.log('location:', location); //result: '{pathname: '/tickets/check', search: '', hash: '', state: {…}, key: 'xf82gqmb'}'
  }, [location, count]);

  const addCount = () => {
    setCount(count + 1);
  };

  const handleScan = (result, error) => {
    // console.log('result:', result);
    addCount();
    if (result && count >= 4) {
      console.log('result:', result);
      setCount(count + 1);
      dispatch(
        checkPage(
          { uuid: result.text },
          { date: history.location.state.date },
          message,
          () => {
            setCount(0);
          }
        )
      );
    }
    console.log('count:', count);
  };

  // const handleClick = () => {
  //   console.log('cam: ', history.location.state.cam);
  // };

  return (
    <>
      {/* <button onClick={handleClick}>dddd</button> // history.location.state.cam 확인용 버튼 */}
      <QrReader
        delay={500}
        onResult={(result, error) => {
          // console.log('result:', result);
          addCount();
          if (result && count >= 4) {
            console.log('result:', result);
            setCount(count + 1);
            dispatch(
              checkPage(
                { uuid: result.text },
                { date: history.location.state.date },
                message,
                () => {
                  setCount(0);
                }
              )
            );
          }
          console.log('count:', count);
        }}
        constraints={{ facingMode: `${history.location.state.cam}` }}
        videoStyle={{}}
        videoContainerStyle={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          paddingTop: '0'
        }}
      />
      <div class="app__overlay">
        <div class="app__overlay-frame"></div>
        {/* <!-- Scanner animation --> */}
        <Scanner />
        <div class="custom-scanner"></div>
        <div class="app__help-text"></div>
      </div>
    </>
  );
}

export default CheckPage;
