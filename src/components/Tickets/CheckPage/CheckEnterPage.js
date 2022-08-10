import React, { useState } from 'react';
import history from '../../../history';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Radio } from 'antd';

export default function CheckEnterPage() {
  let navigate = useNavigate();
  const [size, setSize] = useState('large');

  const obRearCam = () => {
    // navigate('/tickets/check', {
    //   state: {
    //     date: 'OB',
    //     cam: 'environment'
    //   }
    // });
    history.push(
      '/tickets/check',

      { date: 'OB', cam: 'environment' }
    );
  };

  const obFrontCam = () => {
    // navigate('/tickets/check', {
    //   state: {
    //     date: 'OB',
    //     cam: 'user'
    //   }
    // });
    history.push(
      '/tickets/check',

      { date: 'OB', cam: 'user' }
    );
  };

  const ybRearCam = () => {
    history.push(
      '/tickets/check',

      { date: 'YB', cam: 'environment' }
    );
  };

  const ybFrontCam = () => {
    history.push(
      '/tickets/check',

      { date: 'YB', cam: 'user' }
    );
  };

  return (
    <div>
      <Button type="primary" onClick={obRearCam}>
        OB 후방카메라
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={obFrontCam}>
        OB 셀프카메라
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={ybRearCam}>
        YB 후방카메라
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={ybFrontCam}>
        YB 셀프카메라
      </Button>
    </div>
  );
}
