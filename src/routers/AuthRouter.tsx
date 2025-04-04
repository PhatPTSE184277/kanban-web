import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/SignUp';
import { Typography } from 'antd';

const { Title } = Typography;

const AuthRouter = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col d-none d-lg-block text-center' style={{margin: 'auto'}}>
                    <div className='mb-4'>
                        <img
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/f-salon-51786.appspot.com/o/kanban-logo.png?alt=media&token=bb04bbaa-25c2-4499-ba3d-9c8c3f4f10cf'
                            }
                            alt='Logo'
                            style={{
                                width: 300,
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div>
                        <Title className='head-text'>KANBAN</Title>
                    </div>
                </div>
                <div className='col content-center'>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/sign-up' element={<Signup />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default AuthRouter;
