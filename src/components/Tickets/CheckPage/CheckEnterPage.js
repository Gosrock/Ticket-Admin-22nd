import React from 'react';
import history from '../../../history';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function CheckEnterPage() {
  let navigate = useNavigate();

  const obRearCam = () => {
    navigate('/tickets/check', {
      date: 'OB',
      cam: 'environment'
    });
  };

  const obFrontCam = () => {
    history.push({
      pathname: '/tickets/check',
      state: { date: 'OB', cam: 'user' }
    });
  };

  //   const ybFrontCam = e => {
  //     history.push({
  //       pathname: '/tickets/check',
  //       state: { date: 'OB', cam: 'user' }
  //     });
  //   };

  //   const obFrontCam = e => {
  //     history.push({
  //       pathname: '/tickets/check',
  //       state: { date: 'OB', cam: 'user' }
  //     });
  //   };

  return (
    <>
      <Button type="primary" onClick={obRearCam}>
        OB 후방카메라
      </Button>
      <Button type="primary" onClick={obFrontCam}>
        OB 셀프카메라
      </Button>
      {/* <Button type="primary" onClick={{}}>
        YB 후방카메라
      </Button>
      <Button type="primary" onClick={{}}>
        YB 셀프카메라
      </Button> */}
    </>
  );
}
