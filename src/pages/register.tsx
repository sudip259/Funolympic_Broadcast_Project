// Registration page
import { Form, Input, Button, message } from "antd";
import Register_logo from "../Image/Register_logo.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "./error_boundaries";
import { Message } from "semantic-ui-react";
// import AuthService from "./services/auth.service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
// This is user registration page
const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [captchaResult, setCaptchaResult] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values);
    setLoading(true);
    AuthService.register(values.username, values.email, values.password)
      .then((res: Object) => {
        form.resetFields();
        message.success(
          "User Successfully Registered, Please Verify Your Account From Email"
        );
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data.errors);
        setLoading(false);
      });

    // AuthService.register({username:values.username})
  };
  var sectionStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Register_logo})`,
    color: "red",
    backgroundSize: "cover",
    fontSize: "28px",
    // opacity: 0.75,
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
                  SIGNUP WITH FUNOlYMPIC
                </span>
                {errorMessage && (
                  <Message
                    error
                    header={"Something went wrong!"}
                    list={[
                      errorMessage?.password?.[0] &&
                        "Ensure password field has at least 8 characters.",
                      errorMessage?.username?.[0],
                      errorMessage?.email?.[0],
                      errorMessage?.non_field_errors?.[0],
                    ]}
                  />
                )}
                <Form.Item
                  name="username"
                  label={
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Username
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="middle" placeholder="Enter your uesrname" />
                </Form.Item>
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
                  <ReCAPTCHA
                    // ref={(el) => { captchaDemo = el; }}
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
                    Create account
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
      </ErrorBoundary>
    </>
  );
};

export default () => <RegistrationForm />;
