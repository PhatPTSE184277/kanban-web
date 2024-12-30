/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-constant-condition */
import { useDispatch, useSelector } from 'react-redux'
import AuthRouter from './AuthRouter'
import MainRouter from './MainRouter'
import { addAuth, authSelector, AuthState } from '../redux/reducers/authReducer';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const Routers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = localStorage.getItem('authData');
    res && dispatch(addAuth(JSON.parse(res)));  
  }

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? <Spin/> : !auth.token ? <AuthRouter/> : <MainRouter/>
}

export default Routers