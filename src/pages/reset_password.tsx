// Registration page
import { Form, Input, Button, Row, Col, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useParams } from "react-router-dom";
import ErrorBoundary from "./error_boundaries";
import PublicService from "../services/public.service";

// import AuthService from "./services/auth.service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
// reset new password
const ResetPassword = () => {
  const [form] = Form.useForm();
  let params = useParams();
  const [captchaResult, setCaptchaResult] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values);
    setLoading(true);
    PublicService.changePassword(params.uidb64, params.token, values.password)
      .then((res: Object) => {
        form.resetFields();
        message.success("Password changed");
        setLoading(false);
      })
      .catch((err: Object) => {
        setLoading(false);

        message.error("Something went wrong");
      });

    // AuthService.register({username:values.username})
  };

  return (
    <>
      <ErrorBoundary>
        <div style={{ backgroundColor: "rgb(239, 239, 239)" }}>
          {/* {JSON.stringify(params)} */}

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
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  Change Password
                </span>

                <Form.Item
                  name="password"
                  label="New password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="middle"
                    placeholder="Enter your new password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="middle"
                    placeholder="Confirm your password"
                  />
                </Form.Item>

                <Form.Item>
                  {/* Captcha verification */}
                  <ReCAPTCHA
                    id="recaptcha-contact"
                    style={{ minWidth: "10px" }}
                    sitekey="6LdoLdwfAAAAAGlBXGP6bzyR82L9VWTwUbE9NPYb"
                    onChange={(value) => {
                      setLoading(true);
                      fetch("http://127.0.0.1:8000/recaptcha/", {
                        method: "POST",
                        body: JSON.stringify({ captcha_value: value }),
                        headers: { "Content-Type": "application/json" },
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          setCaptchaResult(data.captcha.success);
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    disabled={captchaResult ? false : true}
                  >
                    Change Password
                  </Button>
                  <div
                    style={{
                      float: "right",
                      paddingTop: "10px",
                      fontSize: "15px",
                    }}
                  >
                    <Link
                      to={"/login"}
                      onChange={() => {
                        setCaptchaResult(undefined);
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </div>
                </Form.Item>
              </Col>
              <Col xs={24} xl={16}>
                <img
                  style={{
                    width: "100%",
                    height: "100vh",
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

export default () => <ResetPassword />;
