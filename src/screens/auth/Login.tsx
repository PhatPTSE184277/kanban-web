import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <div>
      <Card style={{ width: 410}}>
        <div className="text-center">
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">Welcome back! Please enter your details.</Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email!",
              } 
            ]}
          >
            <Input allowClear maxLength={100} type="email" placeholder="Enter your email"/>
          </Form.Item>
            <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
              required: true,
              message: "Please enter your password!",
              },
            ]}
            >
            <Input.Password maxLength={100} placeholder="••••••••"/>
            </Form.Item>
        </Form>

        <div className="row">
          <div className="col">
            <Checkbox
              value={isRemember}
              onChange={(val) => setIsRemember(val.target.checked)}
            >
              Remember for 30 days
            </Checkbox>
          </div>

          <div className="col text-right">
            <Link to="/">Forgot Password?</Link>
          </div>
        </div>

        <div className="mt-4 mb-3">
          <Button
            type="primary"
            style={{ width: "100%" }}
            size="large"
            onClick={() => form.submit()}
          >
            Login
          </Button>
        </div>

        <SocialLogin/>
        <div className="mt-4 text-center">
            <Space>
              <Text type="secondary">Don't have an account?</Text>
              <Link to="/sign-up">Sign Up</Link>
            </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
