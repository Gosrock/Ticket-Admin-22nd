import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Segmented, Table, Select } from 'antd';
import { orderListPagination } from '../../../state/actions-creators/orderListPagination';
const { Column } = Table;

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.orderListPagination); // useSelector???? 시발련아 뭐가문제야
  console.log(data);
  const [page, setPage] = useState(1);
  const [day, setDay] = useState('BOTH');

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);
    dispatch(
      orderListPagination({
        requestPage: e
      })
    );
  };

  useEffect(() => {
    dispatch(
      orderListPagination({
        page: 0
      })
    );
  }, [dispatch]);

  return (
    <>
      <Segmented
        options={['BOTH', 'YB', 'OB']}
        value={day}
        onChange={day => {
          if (day === 'OB') {
            setDay(day);
          } else if (day === 'YB') {
            setDay(day);
          } else if (day === 'BOTH') {
            setDay(day);
          }
        }}
      />

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
        dataSource={data ? data.orderList : []}
      >
        <Column title="아이디" dataIndex="id" />
        <Column title="입금자명" dataIndex="user" render={user => user.name} />
        <Column title="주문금액" dataIndex="price" />
        <Column title="티켓 매수" dataIndex="howMany" />
        <Column title="선택 날짜" dataIndex="date" />
        <Column title="주문 일시" dataIndex="createdAt" />
        <Column title="주문 상태" dataIndex="status" />
        <Column title="공짜 티켓 여부" dataIndex="isFree" />
        <Column title="매니저" dataIndex="admin" />
      </Table>
    </>
  );
}
