import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, refeshToken, removeAuth } from '../reduxs/reducers/authReducer';
import axiosClient from '../apis/axiosClient';
import { localDataNames } from '../constants/appInfos';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const logout = () => {
    dispatch(removeAuth({}));
  }

  const getProducts = async () => {
    try {
      const response = await axiosClient.get('storage/products');
      console.log(response);
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.error === "jwt expired") {
          handleRefeshToken();
      }
    }
  }

  const handleRefeshToken = async () => {
    try {
      const response = await axiosClient.get(`auth/refesh-token?id=${auth._id}`);
      if (response.data) {
        console.log(response.data.data)
        dispatch(refeshToken(response.data.data));
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <Button onClick={getProducts}>Logout</Button>
    </>
  )
}

export default HomeScreen