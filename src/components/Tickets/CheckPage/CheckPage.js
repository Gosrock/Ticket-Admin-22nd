import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/CheckPage';

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
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
}

export default CheckPage;
