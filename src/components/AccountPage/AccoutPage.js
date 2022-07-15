import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function AccoutPage() {
  //   const { data } = useSelector((state) => state.getOriginalPolygon);
  let navigate = useNavigate();

  const onLogoutHandler = () => {
    localStorage.removeItem("adminAccessToken");
    // token refresh 요청
    navigate("/auth/login");

    // 새로운 토큰 저장
    axios.defaults.headers.common.Authorization = null;
  };
  return (
    <>
      <div style={{ justifyContent: "space-between", margin: "20px" }}>
        <Button
          style={{ float: "right" }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={onLogoutHandler}
        >
          로그아웃
        </Button>
      </div>
    </>
  );
}

export default AccoutPage;
