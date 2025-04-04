import { Button } from 'antd'
import React from 'react'

const SocialLogin = () => {
  return (
    <Button className='social-button' style={{width: '100%'}} icon={<img width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>} size='large'>Login with Google</Button>
  )
}

export default SocialLogin