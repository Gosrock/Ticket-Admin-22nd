import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { PhoneOutlined, SafetyOutlined, MailOutlined } from '@ant-design/icons';
import './loginpage.css';
import { slackValidation, slackMessage } from '../../state/actions-creators';

function LoginPage() {
  const dispatch = useDispatch();

  const { tickets, error, pending } = useSelector(state => state.slackMessage);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [slackEmail, setSlackEmail] = useState('');
  const [validationNumber, setValidationNumber] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  const onFormValueChangeHandler = obj => {
    if (obj.slackEmail) {
      setSlackEmail(obj.slackEmail);
    }
    if (obj.phoneNumber) {
      setPhoneNumber(obj.phoneNumber);
    }
    if (obj.validationNumber) {
      setValidationNumber(obj.validationNumber);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error.errorMessage);
    }
    // pending 도 여기서 관리가능
    // 다시 테스트
  }, [error]);

  const onSendMessageNumberHandler = () => {
    console.log(phoneNumber, slackEmail);
    if (!phoneNumber.length) {
      return alert('전화번호를 입력해 주세요');
    }
    if (!slackEmail.length) {
      return alert('이메일을 입력해 주세요');
    }
    dispatch(
      slackMessage({ phoneNumber, slackEmail }, () => {
        message.success('인증번호 전송 완료');
        setSendSuccess(true);
      })
    );
  };

  const onSendValidationNumberHandler = () => {
    if (validationNumber.length !== 4) {
      return alert('4자리를 입력해주세요');
    }
    dispatch(
      slackValidation({ phoneNumber, slackEmail, validationNumber }, () => {
        message.success('로그인 완료');
        setValidationSuccess(true);
        setSendSuccess(false);
      })
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onValuesChange={onFormValueChangeHandler}
      >
        <h2>관리자 로그인</h2>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: '전화번호를 입력해주세요'
            }
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="회원가입한 전화번호를 입력해주세요"
            disabled={sendSuccess}
          />
        </Form.Item>
        <Form.Item
          name="slackEmail"
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="슬랙 이메일을 입력해주세요"
            disabled={sendSuccess}
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={8} style={{ height: '30px' }}>
            <Col span={14}>
              <Form.Item
                name="validationNumber"
                rules={[
                  {
                    len: 4,
                    message: '인증번호는 4자리입니다.'
                  },
                  {
                    required: true,
                    message: '인증번호를 입력해주세요'
                  }
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
              <Button
                style={{ float: 'right' }}
                onClick={onSendMessageNumberHandler}
                disabled={sendSuccess}
              >
                인증 번호 전송
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={!sendSuccess}
            onClick={onSendValidationNumberHandler}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
