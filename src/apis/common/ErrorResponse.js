const { default: axios } = require("axios");
// 오류 상황시 문제
// {
//   "statusCode": 400,
//   "timestamp": "2022-07-16T10:09:13.243Z",
//   "path": "/v1/auth/slack/send",
//   "method": "POST",
//   "error": {
//     "statusCode": 400,
//     "message": "가입한 슬랙 이메일을 올바르게 입력해 주세요",
//     "error": "Bad Request"
//   }
// }
// 또는 밸리데이션 error
// {
//   "statusCode": 400,
//   "timestamp": "2022-07-16T12:16:42.141Z",
//   "path": "/v1/auth/message/send",
//   "method": "POST",
//   "error": {
//     "error": "Validation Error",
//     "message": {
//       "phoneNumber": [
//         "phoneNumber must be a phone number"
//       ]
//     },
//     "statusCode": 400
//   }
// }
export const VALIDATION_ERROR = "Validation Error";

export class ErrorResponse {
  // 에러타입은 크게 밸리데이션 error 와 그외에 것들이있습니다.
  errorType;
  validationErrorInfo = {};
  errorMessage;
  errorStatus;

  constructor(errorInfo) {
    if (errorInfo.error === VALIDATION_ERROR) {
      this.errorType = VALIDATION_ERROR;
      this.validationErrorInfo = errorInfo.validationErrorInfo;
    } else {
      this.errorType = errorInfo.error;
    }

    this.errorStatus = errorInfo.statusCode;
    this.errorMessage = errorInfo.errorMessage;
  }

  /**
   * 검증오류인지를 찾아 리턴합니다. 참 거짓을 리턴합니다.
   */
  isValidationError = () => {
    return this.errorType === VALIDATION_ERROR ? true : false;
  };

  /**
   * 검증오류 필드를 찾습니다.
   */
  getValidationErrorFieldName = () => {
    return Object.keys(this.validationErrorInfo);
  };

  /**
   * 검증오류에 해당하는 필드네임으로 오류 문자열 배열을 뽑습니다.
   * 배열을 리턴합니다
   */
  pickUpValidationErrorInfo = (fieldName) => {
    return this.validationErrorInfo[fieldName];
  };
}
export default ErrorResponse;
