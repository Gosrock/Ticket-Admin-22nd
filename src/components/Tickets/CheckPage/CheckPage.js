import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/CheckPage';
import './video.css';
import { ReactComponent as Scanner } from './scanner.svg';
import history from '../../../history';

function CheckPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOldOrYoung, setIsOldOrYoung] = useState('');
  const [isFrontOrRear, setIsFrontOrRear] = useState('');

  const { data, pending } = useSelector(state => state.checkPage);

  useEffect(() => {
    if (!history.location.state) {
      history.push('ticket/checkenter');
    }
    // console.log('history.location.state:', history.location.state); //result: '{date: 'OB', cam: 'environment'}'
    // console.log('location:', location); //result: '{pathname: '/tickets/check', search: '', hash: '', state: {…}, key: 'xf82gqmb'}'
    setIsOldOrYoung(history.location.state.date);
    setIsFrontOrRear(history.location.state.cam); //정상작동!
  }, [location]);

  const handleScan = (result, error) => {
    if (!!result) {
      console.log('result:', result);

      dispatch(
        checkPage({ uuid: result.text }, { date: history.location.state.date })
      );
    }
  };

  // const handleClick = () => {
  //   console.log('cam: ', history.location.state.cam);
  // };

  return (
    <>
      {/* <button onClick={handleClick}>dddd</button> // history.location.state.cam 확인용 버튼 */}
      <QrReader
        delay={300}
        onResult={handleScan}
        constraints={{ facingMode: `${history.location.state.cam}` }} // 여기 확인좀
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
