import { Button, Card, Descriptions } from "antd";
import TokenService from "../services/token.service";

const UserInfo = () => {
  return (
    <Card title="User Details">
      <p>User ID: {TokenService.getUser().id}</p>
      <p>User Name: {TokenService.getUser().username}</p>
      <p>Email: {TokenService.getUser().email}</p>
    </Card>
  );
};
export default () => <UserInfo />;
