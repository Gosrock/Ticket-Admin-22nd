import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import CheckPage from './components/Tickets/CheckPage/CheckPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SocketProvider } from './contexts/socketProvider';
function App({ match }) {
  // const location = useLocation();
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <SocketProvider>
              <MainLayout />{' '}
            </SocketProvider>
          }
        />

        <Route exact path="/tickets/check" element={<CheckPage />} />
      </Routes>
    </>
  );
}

export default App;
