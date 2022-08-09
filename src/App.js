import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import CheckPage from './components/Tickets/CheckPage/CheckPage';
import { Routes, Route, useLocation } from 'react-router-dom';
function App({ match }) {
  const location = useLocation();
  return (
    <>
      <Routes location={location}>
        <Route path="*" element={<MainLayout location={location} />} />
        <Route
          exact
          path="/tickets/check"
          element={<CheckPage location={location} />}
        />
      </Routes>
    </>
  );
}

export default App;
