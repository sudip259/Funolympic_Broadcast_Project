import { Dropdown, Layout, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";
const { Header, Content, Footer, Sider } = Layout;

// This is dashboard page from which will be accessed by user if they are logged in
const Dashboard = () => {
  let navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          onClick: () => {
            // When user clicks on logout button
            // When click on logout button, logout the user and redirect login
            TokenService.removeUser();
            navigate("/login");
          },
          label: (
            <Space>
              <UserOutlined />
              Logout
            </Space>
          ),
        },
      ]}
    />
  );
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">Live Stream App</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard/user-info">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "30px",
            }}
          >
            <div
              style={{ color: "white", fontWeight: "bold", fontSize: "15px" }}
            >
              <Dropdown overlay={menu}>
                <Space>
                  <UserOutlined />
                  {TokenService.getUser().username}
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Admin Panel ©2022 Created by Sudip Bhattarai
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
