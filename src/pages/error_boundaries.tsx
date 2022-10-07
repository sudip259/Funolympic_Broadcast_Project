import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

// This component is used to to handle errors
// This page will prevent the our application from unexpected crash
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // We can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Result
            status="500"
            // title="500"
            subTitle="Sorry, something went wrong. Please contact your tech team"
          />
          {/* <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
export default ErrorBoundary;
