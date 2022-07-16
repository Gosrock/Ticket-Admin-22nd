const { default: axios } = require("axios");

// axios.defaults.baseURL = "https://api.gosrock.band";

class InstanceSetting {
  axiosInstance;

  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  /**
   * accessToken 을 인자로 받아 axiosInstance의 헤더값을 수정합니다.
   * @param {string} accessToken
   */
  changeInstanceDefaultHeaders = (accessToken) => {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  /**
   * 인증 헤더값을 날려버립니다.
   */
  expireAccessTokne = () => {
    this.axiosInstance.defaults.headers.common.Authorization = null;
  };
}
export default InstanceSetting;
