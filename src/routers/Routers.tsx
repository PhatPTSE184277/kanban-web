import React, { useEffect, useState } from 'react'
import AuthRouter from './AuthRouter'
import MainRouter from './MainRouter'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector, AuthState } from '../reduxs/reducers/authReducer'
import { localDataNames } from '../constants/appInfos'
import { Spin } from 'antd'

const Routers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth: AuthState = useSelector(authSelector);
  const dispatch =  useDispatch();

  const getData = async () => {
    const response = localStorage.getItem(localDataNames.authData);
    response && dispatch(addAuth(JSON.parse(response)));
  }

  useEffect(() => {
    getData()
  }, []);

  return isLoading ? <Spin/> : !auth.token ? <AuthRouter/> : <MainRouter/>
}

export default Routers