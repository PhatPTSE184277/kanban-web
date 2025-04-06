import { Button, Spin } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import axiosClient from '../../../apis/axiosClient';
import { localDataNames } from '../../../constants/appInfos';
import { addAuth } from '../../../reduxs/reducers/authReducer';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    login_hint: '25.12t1.phamtanphat@gmail.com'
});

interface Props {
    isRemember?: boolean;
}

const SocialLogin = (props: Props) => {
    const { isRemember } = props;

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            if (result) {
                const user = result.user;

                if (user) {
                    const data = {
                        name: user.displayName,
                        email: user.email
                    };

                    try {
                        const response = await axiosClient.post(
                            'auth/google-login',
                            data
                        );
                        if (response.data.data) {
                            toast.success(response.data.message);
                            dispatch(addAuth(response.data.data));
                        };
                        
                        if (isRemember) {
                            localStorage.setItem(
                                localDataNames.authData,
                                JSON.stringify(response.data.data)
                            );
                        }
                    } catch (error: any) {
                        toast.error(error.response.data.message);
                    }
                }
            } else {
                console.log('Can not login with google');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            loading={isLoading}
            onClick={handleLoginWithGoogle}
            className='social-button'
            style={{ width: '100%' }}
            icon={
                <img
                    width='24'
                    height='24'
                    src='https://img.icons8.com/color/48/google-logo.png'
                    alt='google-logo'
                />
            }
            size='large'
        >
            Login with Google
        </Button>
    );
};

export default SocialLogin;
