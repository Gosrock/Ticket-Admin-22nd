import React from 'react';
import EnterList from './EnterList';
import SocketConnect from './SocketConnect';

function EnterPage() {
  return (
    <div>
      <SocketConnect />
      <EnterList />
    </div>
  );
}

export default EnterPage;
