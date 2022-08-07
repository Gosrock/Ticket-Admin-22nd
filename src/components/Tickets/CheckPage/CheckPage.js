import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import { checkPage } from '../../../state/actions-creators/CheckPage';
import { Card } from 'antd';

function CheckPage() {
  const [qrScan, setQrScan] = useState('No result');
  const [uuid, setUuid] = useState([]);
  // const { data, pending } = useSelector(state => state.checkPage); ??? useSelector 씨발
  const arr = [];

  const handleScan = (result, error) => {
    if (!!result) {
      setQrScan(result.text);
      console.log('result.rawBytes', result.rawBytes);
      result.rawBytes.forEach(x => {
        arr.push(x);
      });
      console.log('arr', arr);
    }
    if (!!error) {
      console.log('ERROR!', error);
    }
  };

  return (
    <>
      <Card title="QR Checker">
        <Card type="inner" title="QR Code Check">
          <QrReader
            delay={300}
            onResult={handleScan}
            style={{ width: '100%' }}
          />
          <h3>Scanned QR Code Here: {qrScan}</h3>
        </Card>
      </Card>

      <button
        onClick={() => {
          setUuid([...arr]);
        }}
      >
        {uuid}
      </button>
    </>
  );
}

export default CheckPage;
