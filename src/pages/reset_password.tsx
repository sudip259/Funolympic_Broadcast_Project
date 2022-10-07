// Registration page
import { Form, Input, Button, Row, Col, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorBoundary from "./error_boundaries";
import PublicService from "../services/public.service";

// import AuthService from "./services/auth.service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
var sectionStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Register_logo})`,
  color: "red",
  backgroundSize: "cover",
  fontSize: "28px",
};
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
      <section style={sectionStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            // backgroundColor: "white",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(41, 39, 39, 0.3)",
              boxShadow: "0 5px 30px black",
              padding: "50px",
              width: "25%",
            }}
          >
            <Form
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <span
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  fontSize: "28px",
                  justifyContent: "center",
                  color: "white",
                  textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
                }}
              >
                Change Password
              </span>

              <Form.Item
                name="password"
                label={
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    New password
                  </span>
                }
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
                label={
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    Confirm Password
                  </span>
                }
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
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default () => <ResetPassword />;
