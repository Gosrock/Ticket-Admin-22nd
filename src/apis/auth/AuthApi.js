const { default: axios, Axios } = require('axios');
const { default: InstanceSetting } = require('../common/instance.api');

// axios.defaults.baseURL = "https://api.gosrock.band";

class AuthApi extends InstanceSetting {
  constructor() {
    super('https://api.gosrock.band/v1/auth');
  }
  // {
  //   "phoneNumber": "string",
  //   "slackEmail": "string"
  // }

  requestSlackValidationNumber = async ({ phoneNumber, slackEmail }) => {
    return await this.axiosInstance.post('/slack/send', {
      phoneNumber,
      slackEmail
    });
  };

  //   {
  //     "phoneNumber": "string",
  //     "slackEmail": "string",
  //     "validationNumber": "string"
  //   }

  validationSlackNumber = async ({
    phoneNumber,
    slackEmail,
    validationNumber
  }) => {
    return await this.axiosInstance.post('/slack/validation', {
      phoneNumber,
      slackEmail,
      validationNumber
    });
  };
}
export default new AuthApi();
