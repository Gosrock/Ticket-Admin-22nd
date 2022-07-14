import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import "./loginpage.css";
// import { slackValidation, slackMessage } from "../../../state/actions-creators";
import { login } from "../../state/actions-creators";

function LoginPage() {
  const dispatch = useDispatch();

  // const { slackMessageToken } = useSelector((state) => state.slackMessage);
  // const { adminValidationToken } = useSelector(
  //   (state) => state.slackValidation
  // );

  const [email, setEmail] = useState("");
  const [validationNumber, setValidationNumber] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const onSubmitHandler = (values) => {
    // event.preventDefault();
    let body = {
      userId: values.email,
      password: values.password,
      // adminValidationToken: adminValidationToken,
    };
    console.log(body);

    // login 요청
    dispatch(login(body));
  };

  const onFormValueChangeHandler = (obj) => {
    if (obj["email"] !== null) {
      setEmail(obj["email"]);
    }
    if (obj["validationNumber"] !== null) {
      setValidationNumber(obj["validationNumber"]);
    }
  };

  // const onSendMessageNumberHandler = () => {
  //   if (!email.length) {
  //     return alert("아이디를 입력해 주세요");
  //   }
  //   dispatch(
  //     slackMessage({ userId: email, type: "login" }, () => {
  //       message.success("인증번호 전송 완료");
  //       setSendSuccess(true);
  //     })
  //   );
  // };

  // const onSendValidationNumberHandler = () => {
  //   if (validationNumber.length !== 6) {
  //     return alert("6자리를 입력해주세요");
  //   }
  //   dispatch(
  //     slackValidation({ slackMessageToken, validationNumber }, () => {
  //       message.success("인증 완료");
  //       setValidationSuccess(true);
  //       setSendSuccess(false);
  //     })
  //   );
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmitHandler}
        onValuesChange={onFormValueChangeHandler}
      >
        <h2>관리자 로그인</h2>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "아이디 입력해 주세요",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="아이디를 입력해주세요"
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={8} style={{ height: "30px" }}>
            <Col span={14}>
              <Form.Item
                name="validationNumber"
                rules={[
                  {
                    len: 6,
                    message: "인증번호는 6자리입니다.",
                  },
                  {
                    required: true,
                    message: "인증번호를 입력해주세요",
                  },
                ]}
              >
                <Input
                  disabled={!sendSuccess}
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                  placeholder="인증번호"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              {sendSuccess || validationSuccess ? (
                <Button
                  style={{ float: "right" }}
                  disabled={validationSuccess}
                  // onClick={onSendValidationNumberHandler}
                >
                  인증 하기
                </Button>
              ) : (
                <Button
                  style={{ float: "right" }}
                  // onClick={onSendMessageNumberHandler}
                >
                  인증 번호 전송
                </Button>
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              min: 6,
              max: 20,
              message: "6-20자리수 비밀번호를 입력해주세요",
            },
            {
              required: true,
              message: "비밀번호입력해주세요",
            },
          ]}
        >
          <Input
            disabled={!validationSuccess}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ float: "right" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            로그인{" "}
          </Button>
        </Form.Item>
        <a href="/auth/register" style={{ float: "left" }}>
          회원가입
        </a>
        <a href="/auth/password" style={{ float: "right" }}>
          비밀번호 찾기
        </a>
      </Form>
    </div>
  );
}

export default LoginPage;
