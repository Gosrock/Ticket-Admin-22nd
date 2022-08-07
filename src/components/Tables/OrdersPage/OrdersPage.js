import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Segmented, Table, Select, message, Popconfirm } from 'antd';
import {
  orderListPagination,
  orderListReq
} from '../../../state/actions-creators/orderListPagination';
import {
  orderStatusChange,
  orderPriceChange
} from '../../../state/actions-creators/orderListPagination';

const { Column } = Table;
const { Option } = Select;

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.orderListPagination);
  console.log(data);
  const [page, setPage] = useState(1);
  const [day, setDay] = useState('ALL');

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);

    if (day === 'ALL') {
      dispatch(orderListReq({ page: e }, { selection: null }));
    } else {
      dispatch(orderListReq({ page: e }, { selection: day }));
    }
  };

  const handleSegment = day => {
    if (day === 'ALL') {
      dispatch(orderListReq({ page: 1 }, { selection: null }));
    } else {
      dispatch(orderListReq({ page: 1 }, { selection: day }));
    }
    setPage(1);
  };

  const handleStatusSelector = (id, e) => {
    // message.info('Success!');
    dispatch(orderStatusChange({ id, e }));
  };

  const handleSetFreeSelector = (id, e) => {
    dispatch(orderPriceChange({ id, e }));
  };

  useEffect(() => {
    dispatch(orderListReq({ page: 1 }, { selection: null }));
  }, [dispatch]);

  return (
    <>
      <Segmented
        options={['ALL', 'BOTH', 'YB', 'OB']}
        value={day}
        onChange={day => {
          setDay(day);
          handleSegment(day);
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
          dataIndex=""
          render={element => {
            return (
              <Select
                defaultValue={element.status}
                style={{
                  width: 120
                }}
                onSelect={e => handleStatusSelector(element.id, e)}
              >
                <Option value="입금확인">입금확인</Option>
                <Option value="입장완료">입장완료</Option>
                <Option value="기한만료">기한만료</Option>
                <Option value="확인대기">확인대기</Option>
              </Select>
            );
          }}
          align="center"
        />
        <Column // 티켓 무료 여부 변경 가능
          title="티켓 무료 여부"
          dataIndex=""
          render={element => {
            return (
              <Select
                defaultValue={element.isFree ? '무료' : '유료'}
                style={{
                  width: 120
                }}
                onSelect={e => handleSetFreeSelector(element.id, e)}
              >
                <Option value="무료">무료</Option>
                <Option value="유료">유료</Option>
              </Select>
            );
          }}
          align="center"
        />
        <Column
          title="관리자"
          dataIndex="admin"
          render={admin => (admin ? admin.name : null)}
          align="center"
        />
      </Table>
    </>
  );
}
