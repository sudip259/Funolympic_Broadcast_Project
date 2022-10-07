// login page
import { Form, Input, Button, Row, Col, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import CAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Message } from "semantic-ui-react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

// This is login page
const LoginForm = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [captchaResult, setCaptchaResult] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const onFinish = (values: any) => {
    setLoading(true);
    // login function called
    AuthService.login(values.email, values.password)
      .then(() => {
        setLoading(false);
        navigate("/browse-live-games");
      })
      .catch((err) => {
        if (err?.response?.data?.hasOwnProperty("non_field_errors") === true) {
          // setErrorMessage(err?.response?.data?.non_field_errors);
          message.error(err?.response?.data?.non_field_errors);
        }
        setLoading(false);
        setErrorMessage(err?.response?.data?.detail);
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
              name="login"
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
                SIGN WITH FUNOlYMPIC
              </span>
              {errorMessage && <Message error header={errorMessage} />}

              <Form.Item
                name="email"
                label={
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    Email
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

              <Form.Item
                name="password"
                label={
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    Password
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
                  placeholder="Enter your password"
                />
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
                        // console.log(data.captcha.success);
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
                  Signin
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
                      to={"/forgot-password"}
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
    </>
  );
};

export default () => <LoginForm />;
