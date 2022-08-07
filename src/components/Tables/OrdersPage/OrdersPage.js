import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Segmented, Table, Select } from 'antd';
import {
  orderListPagination,
  orderListReq
} from '../../../state/actions-creators/orderListPagination';

const { Column } = Table;
const { Option } = Select;

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.orderListPagination);
  console.log(data);
  const [page, setPage] = useState(1);
  const [day, setDay] = useState('BOTH');

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);

    dispatch(orderListReq({ page: e }, { selection: day }));
  };

  const handleSegment = day => {
    dispatch(orderListReq({ page }, { selection: day }));
  };

  useEffect(() => {
    dispatch(orderListReq({ page: 1 }, { selection: null }));
  }, [dispatch]);

  return (
    <>
      <Segmented
        options={['BOTH', 'YB', 'OB']}
        value={day}
        onChange={day => {
          if (day === 'OB') {
            setDay(day);
            handleSegment(day);
            console.log(day);
          } else if (day === 'YB') {
            setDay(day);
            handleSegment(day);
            console.log(day);
          } else if (day === 'BOTH') {
            setDay(day);
            handleSegment(day);
            console.log(day);
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
        <Column title="아이디" dataIndex="id" align="center" />
        <Column
          title="입금자명"
          dataIndex="user"
          render={user => user.name}
          align="center"
        />
        <Column title="주문 금액" dataIndex="price" align="center" />
        <Column title="티켓 매수" dataIndex="ticketCount" align="center" />
        <Column title="선택 날짜" dataIndex="selection" align="center" />
        <Column
          title="주문 일시"
          dataIndex="createdAt"
          align="center"
          render={element => {
            return moment(element).utc(false).format('MM월 DD일 HH:mm');
          }}
        />
        <Column // 주문 상태 변경 가능
          title="주문 상태"
          dataIndex="status"
          render={status => (status ? status : null)}
          align="center"
        />
        <Column // 티켓 무료 여부 변경 가능
          title="티켓 무료 여부"
          dataIndex="isFree"
          render={isFree => (isFree ? '무료' : '유료')}
          align="center"
        />
        <Column
          title="매니저"
          dataIndex="admin"
          render={admin => (admin ? admin.name : '없음')}
          align="center"
        />
      </Table>
    </>
  );
}
