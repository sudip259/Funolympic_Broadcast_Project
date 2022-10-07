import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";

// api request to email verification
const verifyAccount = async (verificationToken: String | undefined) => {
  return await axios.post(`${BASE_URL}/email-verify?${verificationToken}`);
};

// api request to resend account activation link
const resendLink = async (email: String | undefined) => {
  return await axios.post(`${BASE_URL}/resend_email/`, {
    email,
  });
};

// request to send password reset link
const sendForgotEmail = async (email: String | undefined) => {
  return await axios.post(`${BASE_URL}/request-reset-email/`, {
    email,
  });
};
// api request to change password
const changePassword = async (
  uidb64: String | undefined,
  token: String | undefined,
  password: String | undefined
) => {
  return await axios.patch(`${BASE_URL}/password-reset/`, {
    uidb64,
    token,
    password,
  });
};

const PublicService = {
  verifyAccount,
  resendLink,
  sendForgotEmail,
  changePassword,
  // register,
  // login,
};
export default PublicService;
