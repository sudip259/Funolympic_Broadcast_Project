// login page
import { Form, Input, Button, Row, Col, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "./error_boundaries";
import PublicService from "../services/public.service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
// Renend account activation link
const ResendEmail = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // console.log("Received values of form: ", values);
    PublicService.resendLink(values.email)
      .then((res: Object) => {
        message.success("Message sent");
        navigate("/login");
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        message.error("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#00008B",
          padding: "5px",
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Cyber Security
      </div>
      <ErrorBoundary>
        <div style={{ backgroundColor: "rgb(239, 239, 239)" }}>
          <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col xs={24} xl={8} style={{ padding: "15px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    fontSize: "34px",
                    justifyContent: "center",
                  }}
                >
                  RESEND
                </span>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input size="middle" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                  >
                    Resend
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      paddingTop: "10px",
                      justifyContent: "space-between",
                      fontSize: "15px",
                    }}
                  >
                    <div>
                      <Link to={"/login"}>Forgot password?</Link>
                    </div>
                    <div>
                      <Link to={"/register"}>Don't have an account?Signup</Link>
                    </div>
                  </div>
                </Form.Item>
              </Col>
              <Col xs={24} xl={16}>
                <img
                  style={{
                    width: "100%",
                    height: "94.5vh",
                    objectFit: "cover",
                    objectPosition: "bottom",
                  }}
                  src={Register_logo}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default () => <ResendEmail />;
