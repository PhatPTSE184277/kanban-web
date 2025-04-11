import { Avatar, Button, Dropdown, Input, MenuProps, Space } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import { NotificationsOutlined } from '@mui/icons-material';
import { color } from '../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../reduxs/reducers/authReducer';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
            onClick: async () => {
                signOut(auth);
                dispatch(removeAuth({}));
                localStorage.clear();

                navigate('/');
            }
        }
    ]

    return (
        <div className='p-2 row d-flex justify-content-between align-items-center bg-white'>
            <div className='col'>
                <Input
                    className='custom-input'
                    placeholder='Search product, supplier, order'
                    prefix={
                        <SearchIcon
                            style={{ color: '#aaa', fontSize: '20px' }}
                        />
                    }
                    size='large'
                    style={{ borderRadius: 100, width: '50%' }}
                />
            </div>

            <div className='col text-right'>
                <Space>
                    <Button
                        type='text'
                        icon={
                            <NotificationsOutlined
                                style={{
                                    fontSize: '20px',
                                    color: color.grey600
                                }}
                            />
                        }
                    />
                   <Dropdown menu={{ items }}>
                   <Avatar
                        src={
                            user.photoUrl
                        }
                        size={40}
                    />
                   </Dropdown>
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
