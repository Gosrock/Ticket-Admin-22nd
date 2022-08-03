import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Table, Segmented, Select } from 'antd';
import {
  ticketPagi,
  ticketPagination
} from '../../../state/actions-creators/ticketPagination';
import { changeState } from '../../../state/actions-creators/ticketPagination';

const { Column } = Table;
const { Option } = Select;

function TicketsPage() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.ticketPagination);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [state, setState] = useState('');

  const onSelectStateHandler = (e, id) => {
    console.log(' id값 : ', id);
    dispatch(changeState({ id, e }));
  };

  const onPageChange = e => {
    console.log(e);
    setPage(e);
    dispatch(
      ticketPagination({
        requestPage: e
      })
    );
  };
  console.log(data);
  useEffect(() => {
    dispatch(
      ticketPagination({
        requestPage: 1
      }),
      ticketPagi(
        {
          requestVal: 'YB'
        },
        { page: 1 }
      )
    );
  }, [dispatch]);

  const handlefilt = value => {
    if (value === 'YB') {
      setState('OB');
      console.log(state);
    } else {
      setState('YB');
      console.log(state);
    }
    dispatch(
      ticketPagi(
        {
          requestVal: state
        },
        { page }
      )
    );
  };

  //해결법?처음에 나오는 두번 클릭....ㅠ

  return (
    <>
      <Segmented
        options={['YB', 'OB']}
        value={value}
        onChange={value => {
          if (value === 'OB') {
            setValue(value);
            //handlefilt(value);
            console.log(value);
            handlefilt(value);
          } else {
            setValue(value);
            //handlefilt(value);
            console.log(value);
            handlefilt(value);
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
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: event => {
        //       console.log(event, record);
        //       onStopClickHandler(record);
        //     } // click row
        //   };
        // }}
        pageSize={10}
        dataSource={data ? data.ticketList : []}
      >
        <Column title="아이디" dataIndex="id" key="id" />
        <Column title="url" dataIndex="uuid" key="id" />
        <Column
          title="입금자명"
          dataIndex="user"
          render={user => user.name}
          key="id"
        />
        <Column title="공연 날짜" dataIndex="date" key="id" />
        <Column title="예매일자" dataIndex="createdAt" key="id" />
        <Column
          title="Action"
          dataIndex=""
          render={element => {
            return (
              <div style={{ justifyContent: 'space-between', margin: '20px' }}>
                <Select
                  defaultValue={element.status}
                  onSelect={e => onSelectStateHandler(e, element.id)}
                >
                  <Option value="입금확인">입금확인</Option>
                  <Option value="입장완료">입장완료</Option>
                  <Option value="기한만료">기한만료</Option>
                  <Option value="확인대기">확인대기</Option>
                </Select>
              </div>
            );
          }}
        />
        <Column
          title="Admin"
          dataIndex="admin"
          render={admin => (admin ? admin.name : null)}
          key="id"
        />
      </Table>
    </>
  );
}

export default TicketsPage;
