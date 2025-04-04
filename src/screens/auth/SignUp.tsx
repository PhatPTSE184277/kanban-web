import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    const [form] = Form.useForm();

    const handleSignup = (values: { name: String, email: String; password: String, confirmPassword: String }) => {
        console.log(values);
    };

    return (
        <>
            <Card style={{ width: '60%' }}>
                <div className='text-center'>
                    <Title level={2}>Create an account</Title>
                    <Paragraph type='secondary'>
                        Start your 30-day free trial.
                    </Paragraph>
                </div>

                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSignup}
                    size='large'
                    validateTrigger={['onSubmit']}
                >
                    <Form.Item
                        name={'name'}
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name!'
                            }
                        ]}
                    >
                        <Input
                            className='custom-input'
                            placeholder='Enter your name'
                            maxLength={100}
                            type='email'
                        />
                    </Form.Item>
                </Form>

                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSignup}
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
                    onFinish={handleSignup}
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

                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSignup}
                    size='large'
                    validateTrigger={['onSubmit']}
                >
                    <Form.Item
                        name={'confirmPassword'}
                        label='Confirm password'
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

                <div className='mt-4 mb-3'>
                    <Button
                        className='custom-button'
                        style={{ width: '100%' }}
                        size='large'
                        onClick={() => form.submit()}
                    >
                        Get started
                    </Button>
                </div>
                <SocialLogin />
                <div className='mt-4 text-center'>
                    <Space>
                        <Text type='secondary'>Already have an account?</Text>
                        <Link className='custom-link' to={'/login'}>
                            Log in
                        </Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default SignUp;
