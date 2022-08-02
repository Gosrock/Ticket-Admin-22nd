import React from 'react';
import UsersPageTable from './Table';
import UserSearch from './UserSearch';

function UsersPage() {
  return (
    <div>
      <UserSearch />
      <UsersPageTable />
    </div>
  );
}

export default UsersPage;
