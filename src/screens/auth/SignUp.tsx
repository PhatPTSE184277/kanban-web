/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const api = `/auth/register`;
    try {
      const res = await handleAPI(api, values, "post");
      console.log(res)
    } catch (error: any) {
      console.log(error);
      message.error(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card style={{ width: 410}}>
        <div className="text-center">
        <img
          className="mb-3" 
          src={"https://firebasestorage.googleapis.com/v0/b/f-salon-51786.appspot.com/o/kanban-logo.png?alt=media&token=7649839d-e485-4eb0-aaba-b03b8031aa04"} 
          alt="Logo Kanban" 
          style={{width: 48, height: 48}}/>
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">Start your 30-day free trial.</Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleRegister}
          disabled={isLoading}
          size="large"
        >
             <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              } 
            ]}
          >
            <Input allowClear placeholder="Enter your name"/>
          </Form.Item>
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
              () => ({
                validator: (_, value) => {
                    if (value.length < 6) {
                      return Promise.reject(new Error('Password must be at least 6 characters'));
                    }else{
                      return Promise.resolve();
                    }
                }
              })
            ]}
          >
            <Input.Password maxLength={100} placeholder="Create a password"/>
          </Form.Item>
        </Form>

        <div className="mt-4 mb-3">
          <Button 
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            style={{ width: "100%" }}
            size="large"
            onClick={() => form.submit()}
          >
            Sign up
          </Button>
        </div>

        <SocialLogin/>
        <div className="mt-4 text-center">
            <Space>
              <Text type="secondary">Already have an account?</Text>
              <Link to="/login">Log in</Link>
            </Space>
        </div>
      </Card>
    </div>
  );
}

export default SignUp