import { Button, notification, Result } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicService from "../services/public.service";

const Verification = () => {
  const [disabled, setDisabled] = useState(false);
  let { token } = useParams<string>();
  let navigate = useNavigate();

  const openNotification = (data: any) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Clear
      </Button>
    );
    notification.open({
      message: "Successfully verified",
      description: data,
      btn,
      key,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#101820FF",
      }}
    >
      {/* {JSON.stringify(token)} */}
      <Result
        status="success"
        title={
          <span style={{ color: "white", fontWeight: "bold" }}>
            Almost done ! please verify your account and proceed!
          </span>
        }
        extra={[
          <Button
            size="large"
            disabled={disabled}
            type="primary"
            onClick={() => {
              PublicService.verifyAccount(token)
                .then((res) => {
                  setDisabled(true);
                  openNotification(res?.data?.email);
                  navigate("/login");
                })
                .catch((err) => {
                  setDisabled(true);
                  navigate("/login");
                  openNotification(err.response.data.error);
                });
            }}
          >
            Verify
          </Button>,
          <Button
            size="large"
            onClick={() => {
              navigate("/resend");
            }}
          >
            Resend link
          </Button>,
        ]}
      />
    </div>
  );
};

export default () => <Verification />;
