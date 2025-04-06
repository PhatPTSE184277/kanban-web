import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../reduxs/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeAuth({}));
  }

  return (
    <>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default HomeScreen