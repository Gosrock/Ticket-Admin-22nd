import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/checkPage';
import './video.css';
import { ReactComponent as Scanner } from './scanner.svg';

function CheckPage() {
  const dispatch = useDispatch();
  const [qrScan, setQrScan] = useState('No result');
  const { data, pending } = useSelector(state => state.checkPage);

  const handleScan = (result, error) => {
    if (!!result) {
      setQrScan(result.text);
      console.log(qrScan);

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
