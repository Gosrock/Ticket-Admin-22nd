import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Table } from 'antd';
import { examplePagination } from '../../../state/actions-creators/examplePagination';
const { Column } = Table;

function TableExample() {
  const dispatch = useDispatch();
  const { data, pending } = useSelector(state => state.examplePagination);
  const [page, setPage] = useState(1);

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);
    dispatch(
      examplePagination({
        requestPage: e
      })
    );
  };

  useEffect(() => {
    dispatch(
      examplePagination({
        page: 0
      })
    );
  }, [dispatch]);

  // 받을 수 있는 정보 목록
  //   {
  //     "albumId": 1,
  //     "id": 11,
  //     "title": "nihil at amet non hic quia qui",
  //     "url": "https://via.placeholder.com/600/1ee8a4",
  //     "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
  //   },

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
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: event => {
        //       console.log(event, record);
        //       onStopClickHandler(record);
        //     } // click row
        //   };
        // }}
        pageSize={10}
        dataSource={data ? data.photoList : []}
      >
        <Column
          title="썸네일"
          dataIndex="thumbnailUrl"
          key="id"
          render={element => {
            return <Avatar src={element} />;
          }}
        />
        <Column title="앨범 아이디" dataIndex="id" key="id" />
        <Column title="제목" dataIndex="title" key="id" />

        <Column
          title="관리"
          // dataindex 정보를 안주면 render 의 element 가 행 하나의 값이 들어가게됨
          dataIndex=""
          key="id"
          render={element => {
            return (
              <button
                key={element.id}
                style={{
                  backgroundColor: 'inherit',
                  border: 'none',
                  fontWeight: 700
                }}
                onClick={() => console.log(element)}
              >
                클릭 이벤트 콘솔 창 확인
              </button>
            );
          }}
        />
      </Table>
    </>
  );
}

export default TableExample;
