import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { enterPage } from '../state/actions-creators/enterPage';
import SocketContext from './socketContext';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);
  const placement = 'bottomRight';

  const socket = io('https://api.gosrock.band/socket/admin', {
    auth: {
      token: accessToken
    }
  });

  useEffect(() => {
    socket.on('connect', data => {
      console.log('connection server', data);
    });
    socket.on('enter', data => {
      dispatch(
        enterPage({
          data: data,
          enterTime: new Date()
        })
      );

      notification.open({
        message: `[${moment(new Date())
          .utc(true)
          .format('HH:mm')}] 입장 알림 🔔 `,
        description: `${data.name}, ${data.phoneNumber}`,
        placement,
        icon:
          data.success === true ? (
            <CheckCircleOutlined style={{ color: '#89cc8a' }} />
          ) : (
            <CloseCircleOutlined style={{ color: '#cc8989' }} />
          )
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  socket.on('connect_error', err => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });

  return <SocketContext.Provider>{children}</SocketContext.Provider>;
};

export { SocketProvider };