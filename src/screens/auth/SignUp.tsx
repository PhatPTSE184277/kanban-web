import { Button, Card, Form, Input, Space, Spin, Typography } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import axiosClient from '../../apis/axiosClient';
import { toast } from 'react-toastify'; 
import { useDispatch } from 'react-redux';
import { localDataNames } from '../../constants/appInfos';
import { addAuth } from '../../reduxs/reducers/authReducer';

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const handleSignup = async (values: { name: String, email: String; password: String }) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('auth/register', values);
            if (response.data.data) {
                localStorage.setItem(localDataNames.authData, JSON.stringify(response.data.data));
                dispatch(addAuth(response.data.data));
                navigate('/');
            }
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }finally{
            setIsLoading(false);
        }
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
                            type='text'
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
                            }, () => ({
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    if (value.length < 6) {
                                        return Promise.reject(new Error('The password must be at least 6 characters'))
                                    }else{
                                        return Promise.resolve();
                                    }
                                }
                            })
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
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                              }),
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

                <div className='mt-5 mb-3'>
                    <Button
                        disabled={isLoading}
                        className='custom-button'
                        style={{ width: '100%' }}
                        size='large'
                        onClick={() => form.submit()}
                    >
                        Sign up
                    </Button>
                </div>
                <SocialLogin />
                <div className='mt-4 text-center'>
                    <Space>
                        <Text type='secondary'>Already have an account?</Text>
                        <Link className='custom-link' to={'/'}>
                            Log in
                        </Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default SignUp;
