/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res: any = await handleAPI(`auth/login`, values, "post");
      if (res.data) {
        toast.success(res.message);
        res.data && dispatch(addAuth(res.data));
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card style={{ width: 410 }}>
        <div className="text-center">
          <img
            className="mb-3"
            src={
              "https://firebasestorage.googleapis.com/v0/b/f-salon-51786.appspot.com/o/kanban-logo.png?alt=media&token=7649839d-e485-4eb0-aaba-b03b8031aa04"
            }
            alt="Logo Kanban"
            style={{ width: 48, height: 48 }}
          />
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">
            Welcome back! Please enter your details.
          </Paragraph>
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
              },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              type="email"
              placeholder="Enter your email"
            />
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
            <Input.Password maxLength={100} placeholder="••••••••" />
          </Form.Item>
        </Form>

        <div className="row">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(e) => setIsRemember(e.target.checked)}
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
            disabled={isLoading}
            loading={isLoading}
            type="primary"
            style={{ width: "100%" }}
            size="large"
            onClick={() => form.submit()}
          >
            Login
          </Button>
        </div>

        <SocialLogin />
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
