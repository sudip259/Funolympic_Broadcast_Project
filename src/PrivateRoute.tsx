import { Navigate } from "react-router-dom";
import TokenService from "./services/token.service";

const ProtectedRoute = ({ children }: any) => {
  // if user is not authorized then redirect to login page
  // if user is authorized then redirect to respective page
  if (TokenService.getUser().username !== undefined) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
