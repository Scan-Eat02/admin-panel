import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import useLoginController from "./loginController";
import GoogleOAuth from "../googleOAuth";

const Login = () => {
  const {
    form,
    isLogingIn,
    isGoogleAuthLogingIn,
    onFinish,
    onBlur,
    onGoogleAuth,
  } = useLoginController();
  return (
    <>
      <h1 className="h4">Welcome to Scan and Eat</h1>
      <p className="m-b-40">Login to your account</p>
      <Form
        layout="vertical"
        name="login-form"
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="on"
        disabled={isLogingIn || isGoogleAuthLogingIn}
      >
        <Form.Item
          name="email"
          label={"Enter Email"}
          rules={[
            {
              required: true,
              message: "Please provide an Email",
            },
          ]}
        >
          <Input onBlur={() => onBlur("email")} size={"large"} />
        </Form.Item>
        {/* <Form.Item
          name="emailOrNumber"
          label={"Enter email or mobile number"}
          rules={[
            {
              required: true,
              message: "Please provide an email or mobile number",
            },
          ]}
        >
          <Input onBlur={() => onBlur("emailOrNumber")} size={"large"} />
        </Form.Item> */}
        <Form.Item
          name="password"
          label={"Enter password"}
          rules={[
            {
              required: true,
              message: "Password is required.",
            },
          ]}
        >
          <Input.Password
            onBlur={() => onBlur("password")}
            size={"large"}
          ></Input.Password>
        </Form.Item>

        <Row gutter={16} className="m-b-24">
          <Col className="gutter-row text-right  lh-normal" span={12}>
            <Link to="/forgot-password">Forget Password ?</Link>
          </Col>
        </Row>

        <Button
          id={"login"}
          type="primary"
          htmlType="submit"
          className="w-100"
          loading={isLogingIn}
          disabled={isGoogleAuthLogingIn}
          size="large"
        >
          Login
        </Button>
      </Form>
      or <GoogleOAuth isDisabled={isLogingIn} onGoogleAuth={onGoogleAuth} />
      <Row gutter={16} className="m-t-16">
        <Col className="gutter-row text-center" span={24}>
          <span>Don't have an account?</span>
          <Link to="/signup" className="ml-2">
            Sign Up
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default Login;
