import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Card, Tag, Space, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function RecentEnter() {
  const { enterData } = useSelector(state => state.enterPage);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      message.info(`입장 알림`);
    }
  }, [enterData]);

  return (
    <>
      {enterData.ticketData ? (
        <div>
          <div>
            <Card
              title={`${enterData.ticketData.name}`}
              bordered={false}
              style={{
                textAlign: 'center'
              }}
            >
              {enterData.ticketData.success === true ? (
                <Tag icon={<CheckCircleOutlined />} color="#89cc8a">
                  입장완료
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="#cc8989">
                  입장실패
                </Tag>
              )}
              <br /> <br />
              <p>
                입장시간:{' '}
                {moment(enterData.enterTime).utc(true).format('HH:mm')}
              </p>
              <p>전화번호: {enterData.ticketData.phoneNumber}</p>
              <p>공연날짜: {enterData.ticketData.date}</p>
              <p>uuid: {enterData.ticketData.uuid}</p>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <Card
            title="입장 대기 중"
            bordered={false}
            style={{
              textAlign: 'center'
            }}
          >
            <Space>
              <LoadingOutlined />
            </Space>
          </Card>
        </div>
      )}
    </>
  );
}

export default RecentEnter;
