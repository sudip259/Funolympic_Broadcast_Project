import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";

// Page if routing does not match
const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="primary"
          >
            <Link to={"/"}>Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};
export default () => <NotFound />;
