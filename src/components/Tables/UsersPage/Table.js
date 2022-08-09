import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Typography } from 'antd';
import { usersPage } from '../../../state/actions-creators/usersPage';
import moment from 'moment';

const { Column } = Table;
const { Text } = Typography;

function UsersPageTable() {
  const dispatch = useDispatch();
  const { data, pending, option } = useSelector(state => state.usersPage);
  const [page, setPage] = useState(1);

  const onPageChange = e => {
    console.log('page', { data });
    // 페이지네이션 번호 바뀔때 뜸.
    setPage(e);
    dispatch(
      usersPage({
        searchOption: option ? option.searchOption : '',
        searchString: option ? option.searchString : '',
        requestPage: e
      })
    );
  };

  useEffect(() => {
    console.log('search option: ', option.searchOption, option.searchString);
    dispatch(
      usersPage({
        searchOption: option ? option.searchOption : '',
        searchString: option ? option.searchString : '',
        requestPage: 1
      })
    );
  }, [option]);

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
        <Column
          title="가입일"
          dataIndex="createAt"
          key="id"
          render={element => {
            return moment(new Date(element)).utc(false).format('MM월 DD일');
          }}
        />
        <Column
          title="어드민 여부"
          dataIndex="role"
          key="id"
          render={element => {
            return element === 'Admin' ? (
              <Text type="danger">{element}</Text>
            ) : (
              element
            );
          }}
        />
      </Table>
    </>
  );
}

export default UsersPageTable;
