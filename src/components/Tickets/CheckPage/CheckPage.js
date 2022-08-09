import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/CheckPage';
import './video.css';
import { ReactComponent as Scanner } from './scanner.svg';
import history from '../../../history';

function CheckPage({ location }) {
  const dispatch = useDispatch();
  // const location = useLocation();

  const { data, pending } = useSelector(state => state.checkPage);

  useEffect(() => {
    console.log(history.location.state); // result: '/secondpage'
    console.log(location); // result: 'some_value'
  }, [location]);

  const handleScan = (result, error) => {
    if (!!result) {
      console.log('result:', result);

      dispatch(checkPage({ uuid: result.text }));
    }
  };

  return (
    <>
      <QrReader
        delay={300}
        onResult={handleScan}
        constraints={{ facingMode: 'environment' }}
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
