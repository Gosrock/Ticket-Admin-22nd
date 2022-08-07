import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import CheckPage from './components/Tickets/CheckPage/CheckPage';
import { Routes, Route } from 'react-router-dom';
function App({ match }) {
  return (
    <>
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route exact path="/tickets/check" element={<CheckPage />} />
      </Routes>
    </>
  );
}

export default App;
