import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, List, Tag, Col, Row } from 'antd';
import moment from 'moment';
import VirtualList from 'rc-virtual-list';
import React from 'react';
import { useSelector } from 'react-redux';
import RecentEnter from './RecentEnter';

const ContainerHeight = 800;

function EnterList() {
  const { ticketList } = useSelector(state => state.enterPage);

  const onScroll = e => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
    }
  };

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <div>
              <RecentEnter />
            </div>
          </Col>
          <Col span={16}>
            <List>
              <VirtualList
                data={ticketList}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {item => (
                  <List.Item key={item.ticketData.uuid}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#a5a6a8'
                          }}
                        >
                          {item.ticketData.name}
                        </Avatar>
                      }
                      title={`${moment(item.enterTime)
                        .utc(true)
                        .format('HH:mm')} ${item.ticketData.name}`}
                      description={`[${item.ticketData.date}] ${item.ticketData.uuid}, ${item.ticketData.phoneNumber}`}
                    />
                    {item.ticketData.success === true ? (
                      <Tag icon={<CheckCircleOutlined />} color="#89cc8a">
                        입장완료
                      </Tag>
                    ) : (
                      <Tag icon={<CloseCircleOutlined />} color="#cc8989">
                        입장실패
                      </Tag>
                    )}
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EnterList;
