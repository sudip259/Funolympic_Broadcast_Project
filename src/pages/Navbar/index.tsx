import { useState } from "react";
import { Drawer, Button, Dropdown, Space, Menu } from "antd";
import "./App.css";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../Image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BarsOutlined } from "@ant-design/icons";
import TokenService from "../../services/token.service";

const Navbar = () => {
  const [active, setActive] = useState<any>("browse");
  let navigate = useNavigate();
  const [state, setState] = useState<any>({
    current: "mail",
    visible: false,
  });

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({ visible: false });
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Space
              style={{ color: "blue" }}
              onClick={() => {
                TokenService.removeUser();
                navigate("/login");
              }}
            >
              Logout
            </Space>
          ),
          key: "1",
        },
      ]}
    />
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <div className="menuBar">
        <Link
          onClick={() => setActive("browse")}
          className="active"
          to="browse-live-games"
        >
          <img style={{ width: "70px" }} src={logo} />
        </Link>
        <Link
          onClick={() => setActive("browse")}
          // style={{ color: "red" }}
          style={{
            color: active === "browse" ? "red" : "black",
            borderBottom: active === "browse" ? "3px solid red" : "white",
          }}
          className="non-active"
          to="browse-live-games"
        >
          Browse Live Games
        </Link>
        <Link
          style={{
            color: active === "highlights" ? "red" : "black",
            borderBottom: active === "highlights" ? "3px solid red" : "white",
          }}
          onClick={() => setActive("highlights")}
          className="non-active"
          to="match-highlights"
        >
          Match Highlights
        </Link>

        <Dropdown className="non-active" overlay={menu}>
          <Link
            style={{ color: "black" }}
            onClick={(e) => e.preventDefault()}
            to={"login"}
          >
            <UserOutlined /> <Space>Sudip</Space>
          </Link>
        </Dropdown>
        <BarsOutlined
          className="barsMenu"
          style={{ fontSize: "30px", color: "black" }}
          onClick={showDrawer}
        />
        <Drawer
          title="Fun Olympic Games"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <div
            style={{
              marginTop: "-20px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <a>Browse Live Game</a>
            <a>Match Highlights</a>
            <a>Logout</a>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
