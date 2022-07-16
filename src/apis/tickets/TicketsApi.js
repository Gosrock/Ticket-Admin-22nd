const { default: axios } = require('axios');

// axios.defaults.baseURL = "https://api.gosrock.band";
const { default: InstanceSetting } = require('../common/instance.api');

class TicketsApi extends InstanceSetting {
  constructor() {
    super('https://api.gosrock.band/v1/tickets');
  }

  // 예시임다
  getTickets = async ({ phoneNumber, slackEmail }) => {
    await this.axiosInstance.post('/slack/send', {
      phoneNumber,
      slackEmail
    });
  };
}
export default new TicketsApi();
