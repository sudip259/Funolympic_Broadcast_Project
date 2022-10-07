// login page
import { Form, Input, Button, Row, Col, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import CAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "./error_boundaries";
import PublicService from "../services/public.service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
// This is forgot password page
// When the user click on forgot password in login page this page will appears
// From this page user can reset their password by sending reset link in email
const ForgotPassword = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [captchaResult, setCaptchaResult] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // console.log("Received values of form: ", values);
    PublicService.sendForgotEmail(values.email)
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
  var sectionStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Register_logo})`,
    color: "red",
    backgroundSize: "cover",
    fontSize: "28px",
  };

  return (
    <>
      <ErrorBoundary>
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
                  Forgot Password
                </span>

                <Form.Item
                  name="email"
                  label={
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      E-mail
                    </span>
                  }
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
                  <CAPTCHA
                    id="recaptcha-contact1"
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
                    Send Password Reset Link
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
                      <Link
                        to={"/login"}
                        onChange={() => {
                          setCaptchaResult(undefined);
                        }}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={"/register"}
                        onClick={() => {
                          setCaptchaResult(undefined);
                        }}
                      >
                        Don't have an account?Signup
                      </Link>
                    </div>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </>
  );
};

export default () => <ForgotPassword />;
