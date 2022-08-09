import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const requireAuth =
  Component =>
  ({ ...props }) => {
    const { authenticated } = useSelector(state => state.auth);

    console.log('인증 부분 검사', authenticated, !authenticated);

    return authenticated === false ? (
      <Component {...props} />
    ) : (
      <Navigate to="/landing" />
    );
  };

export default requireAuth;
