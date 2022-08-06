import axios from 'axios';
import { LANDING_PAGE_SUCCESS, LANDING_PAGE_ERROR } from '../action-types';

export const LandingPage = callback => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.gosrock.band/v1/orders/report`
    );
    console.log(response.data.data);

    const newData = response.data.data;
    const data = {
      totalTicket: newData.ticketReport.totalTicket,
      depositedTicket: newData.ticketReport.depositedTicket,
      income: newData.income,
      doneOrder: newData.orderReport.doneOrder,
      waitOrder: newData.orderReport.waitOrder,
      expireOrder: newData.orderReport.waitOrder,
      enteredTicket: newData.enterReport.enteredTicket,
      nonEnteredTicket: newData.enterReport.nonEnteredTicket
    };

    dispatch({ type: LANDING_PAGE_SUCCESS, payload: data });

    // 자동으로 피쳐로 넘어가게끔
    // callback();
  } catch (e) {
    //400 ~
    console.log(e);
    dispatch({ type: LANDING_PAGE_ERROR, payload: '조회 실패' });
  }
};
