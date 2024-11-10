import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import useSignUpController from "./signupController";
import { PASSWORD_REGEX_PATTERN, PHONE_REGEX_PATTERN } from "@/utils/regex";

const SignUp = () => {
  const { form, onFinish, onBlur } = useSignUpController();
  return (
    <>
      <h1 className="h4">Create your account</h1>
      <p className="m-b-40">Sign up to get started</p>
      <Form
        layout="vertical"
        name="sign-up-form"
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
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          label={"First Name"}
          rules={[
            {
              required: true,
              message: "Please provide your first name",
            },
          ]}
        >
          <Input size={"large"} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={"Last Name"}
          rules={[
            {
              required: true,
              message: "Please provide your last name",
            },
          ]}
        >
          <Input size={"large"} />
        </Form.Item>

        <Form.Item
          name="email"
          label={"Email"}
          rules={[
            {
              required: true,
              message: "Please provide your email",
            },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input onBlur={() => onBlur("email")} size={"large"} />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          label={"Mobile Number"}
          rules={[
            {
              required: true,
              message: "Please provide your mobile number",
            },
            {
              pattern: PHONE_REGEX_PATTERN,
              message: "Please enter a valid mobile number",
            },
          ]}
        >
          <Input onBlur={() => onBlur("mobileNumber")} size={"large"} />
        </Form.Item>

        <Form.Item
          name="password"
          label={"Password"}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            {
              pattern: PASSWORD_REGEX_PATTERN,
              message:
                "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
            },
          ]}
        >
          <Input.Password onBlur={() => onBlur("password")} size={"large"} />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={"Confirm Password"}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size={"large"}
          />
        </Form.Item>

        <Row gutter={16} className="m-b-24">
          <Col className="gutter-row text-right lh-normal" span={12}>
            <Link to="/login">Already have an account? Login</Link>
          </Col>
        </Row>

        <Button
          id={"sign-up"}
          type="primary"
          htmlType="submit"
          className="w-100"
          loading={false}
          size="large"
        >
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
