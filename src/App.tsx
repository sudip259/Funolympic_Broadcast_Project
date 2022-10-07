// Component for routing
import "antd/dist/antd.css"; //  'antd/dist/antd.less'
import RegistrationForm from "./pages/register";
import LoginForm from "./pages/login";
import NotFound from "./pages/not_found";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verification from "./pages/verification";
import ForgotPassword from "./pages/forgot_password";
import Resend from "./pages/resend";
import Reset_password from "./pages/reset_password";
import Dashboard from "./pages/dashboard";
import Userinfo from "./pages/userinfo";
import ProtectedRoute from "./PrivateRoute";
import MainLayout from "./pages/Navbar/MainLayout";

declare global {
  interface Window {
    grecaptcha: any;
  }
}
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/resend" element={<Resend />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="api/email-verify/:token/" element={<Verification />} />
        <Route
          path="api/password-reset/:token/:uidb64"
          element={<Reset_password />}
        />
        {/* Restrict routing if user is not authorized  */}
        {/* <Route
          path="dashboard"
          element={
            <>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </>
          }
        >
          <Route index element={<Userinfo />} />
          <Route path="user" element={<Userinfo />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}

        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};
export default () => <App />;
