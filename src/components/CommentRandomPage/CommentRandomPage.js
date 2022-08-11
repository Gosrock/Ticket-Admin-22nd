import React, { useEffect } from 'react';
import { randomCom } from '../../state/actions-creators/randomCom';

import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
const { Column } = Table;

function CommentRandomPage() {
  const { randm } = useSelector(state => state.randomCom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomCom());
  }, [dispatch]);

  return (
    <div>
      <Table dataSource={randm ? randm._list : []}>
        <Column width={150} title="댓글 고유 아이디" dataIndex="id" />
        <Column width={300} title="댓글" dataIndex="content" />
        <Column width={150} title="익명 닉네임" dataIndex="nickName" />
        <Column
          width={150}
          title="유저아이디"
          dataIndex="userInfo"
          render={userInfo => (userInfo ? userInfo.id : null)}
          key="id"
        />
        <Column
          width={150}
          title="유저전번"
          dataIndex="userInfo"
          render={userInfo => (userInfo ? userInfo.phoneNumber : null)}
          key="id"
        />
        <Column
          width={150}
          title="입금자명"
          dataIndex="userInfo"
          render={userInfo => (userInfo ? userInfo.name : null)}
          key="id"
        />
      </Table>
    </div>
  );
}

export default CommentRandomPage;
