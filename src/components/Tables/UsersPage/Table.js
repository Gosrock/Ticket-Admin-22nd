import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { usersPage } from '../../../state/actions-creators/usersPage';
const { Column } = Table;

function UsersPageTable() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.usersPage);
  const [page, setPage] = useState(1);

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);
    dispatch(
      usersPage({
        requestPage: e
      })
    );
  };

  useEffect(() => {
    dispatch(
      usersPage({
        requestPage: 1
      })
    );
  }, [dispatch]);

  // 받을 수 있는 정보 목록
  //   {
  //   "id": 3,
  //   "name": "강나연",
  //   "phoneNumber": "01075546670",
  //   "role": "Admin",
  //   "ticketNum": 0
  // },

  return (
    <>
      <Table
        loading={pending}
        pagination={{
          current: page,
          pageSize: 10,
          total: data ? data.total : 0,
          showSizeChanger: false,
          onChange: onPageChange
        }}
        key="id"
        rowKey="id"
        pageSize={10}
        dataSource={data ? data.userList : []}
      >
        <Column title="유저" dataIndex="id" key="id" />
        <Column title="입금자명" dataIndex="name" key="id" />
        <Column title="전화번호" dataIndex="phoneNumber" key="id" />
        <Column title="구입한 티켓 매수" dataIndex="ticketNum" key="id" />
        <Column title="가입일" dataIndex="title" key="id" />
        <Column title="어드민 여부" dataIndex="role" key="id" />
      </Table>
    </>
  );
}

export default UsersPageTable;
