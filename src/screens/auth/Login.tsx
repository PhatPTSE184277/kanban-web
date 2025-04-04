import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';

const { Title, Paragraph, Text } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    const [form] = Form.useForm();

    const handleLogin = (values: { email: String; password: String }) => {
        console.log(values);
    };

    return (
        <>
            <Card style={{width: '60%'}}>
                <div className='text-center'>
                    <Title level={2}>Log in to your account</Title>
                    <Paragraph type='secondary'>
                        Welcome back! Please enter your details.
                    </Paragraph>
                </div>

                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleLogin}
                    size='large'
                    validateTrigger={['onSubmit']}
                >
                    <Form.Item
                        name={'email'}
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!'
                            }
                        ]}
                    >
                        <Input
                            className='custom-input'
                            placeholder='Enter your email'
                            maxLength={100}
                            type='email'
                        />
                    </Form.Item>
                </Form>

                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleLogin}
                    size='large'
                    validateTrigger={['onSubmit']}
                >
                    <Form.Item
                        name={'password'}
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!'
                            }
                        ]}
                    >
                        <Input
                            className='custom-input'
                            placeholder='••••••••'
                            maxLength={100}
                            type='password'
                        />
                    </Form.Item>
                </Form>

                <div className='row'>
                    <div className='col'>
                        <Checkbox
                            className='custom-checkbox'
                            checked={isRemember}
                            onChange={(e) => setIsRemember(e.target.checked)}
                        >
                            Remember for 30 days
                        </Checkbox>
                    </div>
                    <div className='col text-right'>
                        <Link className='custom-link' to={'/'}>
                            Forgot password
                        </Link>
                    </div>
                </div>

                <div className='mt-4 mb-3'>
                    <Button
                        className='custom-button'
                        style={{ width: '100%' }}
                        size='large'
                        onClick={() => form.submit()}
                    >
                        Login
                    </Button>
                </div>
                <SocialLogin/>
                <div className="mt-4 text-center">
                    <Space>
                        <Text type='secondary'>Don’t have an account?</Text>
                        <Link className='custom-link' to={'/sign-up'}>
                            Sign up
                        </Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default Login;
