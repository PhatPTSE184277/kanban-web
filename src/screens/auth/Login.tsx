import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import axiosClient from '../../apis/axiosClient';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../reduxs/reducers/authReducer';
import { appInfo, localDataNames } from '../../constants/appInfos';

const { Title, Paragraph, Text } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleLogin = async (values: { email: String; password: String }) => {
        setIsLoading(true);
        try {
            const response: any = await axiosClient.post('auth/login', values);
            if (response.data) {
                toast.success(response.message);
                dispatch(addAuth(response.data));

                if (isRemember) {
                    localStorage.setItem(
                        localDataNames.authData,
                        JSON.stringify(response.data)
                    );
                }
            }
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card style={{ width: '60%' }}>
                <div className='text-center'>
                    <img
                        src={appInfo.logo}
                        alt={appInfo.title}
                        style={{ width: 48, height: 48 }}
                    />
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

                <div className='row mt-5'>
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
                        loading={isLoading}
                        className='custom-button'
                        style={{ width: '100%' }}
                        size='large'
                        onClick={() => form.submit()}
                    >
                        Login
                    </Button>
                </div>
                <SocialLogin isRemember={isRemember} />
                <div className='mt-4 text-center'>
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
