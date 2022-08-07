import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { enterPage } from '../../../state/actions-creators/enterPage';

function SocketConnect() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);
  const { ticketData, ticketList } = useSelector(state => state.enterPage);

  console.log('accessToken', accessToken);

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
      console.log('enter', data);
      dispatch(
        enterPage({
          data: data,
          enterTime: new Date()
        })
      );
    });

    console.log('ticketData', ticketData);
    console.log('ticketList', ticketList);

    return () => {
      socket.close();
    };
  }, [dispatch, ticketData]);

  socket.on('connect_error', err => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });
}

export default SocketConnect;
