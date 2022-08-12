import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const requireAuth =
  Component =>
  ({ ...props }) => {
    const { authenticated } = useSelector(state => state.auth);

    return authenticated !== false ? (
      <Component {...props} />
    ) : (
      <Navigate to="/auth/login" />
    );
  };

export default requireAuth;
