import React from "react";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../state/actions-creators";

function AccoutPage() {
  //   const { data } = useSelector((state) => state.getOriginalPolygon);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(
      logout(() => {
        message.success("로그아웃 되셨습니다.");
      })
    );
    // 새로운 토큰 저장
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
