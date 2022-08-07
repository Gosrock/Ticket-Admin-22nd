import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/checkPage';

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
        videoStyle={{
          transform: 'translateX(-50%) translateY(-50%)',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          position: 'absolute'
        }}
        videoContainerStyle={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      />
    </>
  );
}

export default CheckPage;
