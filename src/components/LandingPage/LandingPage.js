import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from './Box';
import { Table } from 'antd';
import { LandingPage } from '../../state/actions-creators/LandingPage';

function Landing_Page() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.LandingPage);

  useEffect(() => {
    dispatch(LandingPage());
  }, [dispatch]);

  console.log(data);

  return (
    <div style={{ display: 'flex' }}>
      <ul>
        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          티켓 관련
        </p>

        {data && (
          <div>
            <Box data={data?.totalTicket} title={'링크 발급된 티켓'}>
              {' '}
            </Box>

            <Box data={data?.depositedTicket} title={'입금 확인된 티켓'}>
              {' '}
            </Box>

            <Box data={data?.income} title={'판매대금'}>
              {' '}
            </Box>
          </div>
        )}

        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          입금 관련
        </p>
        {data && (
          <div>
            <Box data={data?.doneOrder} title={'입금 확인 완료'}>
              {' '}
            </Box>

            <Box data={data?.waitOrder} title={'입금 확인 중'}>
              {' '}
            </Box>

            <Box data={data?.expireOrder} title={'미입금 처리'}>
              {' '}
            </Box>
          </div>
        )}

        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          입장 확인 관련
        </p>
        {data && (
          <div>
            <Box data={data?.enteredTicket} title={'입장 확인된 티켓'}>
              {' '}
            </Box>

            <Box data={data?.nonEnteredTicket} title={'입장 확인 안 된 티켓'}>
              {' '}
            </Box>
          </div>
        )}
      </ul>

      {/* {RandomComment()} */}
    </div>
  );
}

export default Landing_Page;
