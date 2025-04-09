import { Avatar, Button, Input, Space } from 'antd';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { NotificationsOutlined } from '@mui/icons-material';
import { color } from '../constants/color';

const HeaderComponent = () => {
    return (
        <div className='p-2 row d-flex justify-content-between align-items-center bg-white'>
            <div className='col'>
                <Input
                    className='custom-input'
                    placeholder='Search...'
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
                    <Avatar
                        src={
                            'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-1/295247187_1425207171224227_9133611363684535476_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=jHc1n70JSqUQ7kNvwEwccyD&_nc_oc=Adl8x7oM4RYV0TVgahDyC8x8tTWiUmKgaBF8ZCgVwaT_213CX1lTJfpuYPRrmEX7D7g-WwXw6gEAX7NA9nK2qRRH&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=MeLae38gBUnvZ5o8p6lzDw&oh=00_AfFrDAgbci_62wPUOu6V4wefynOeJTeoNHD52jOAD6uiig&oe=67FC3264'
                        }
                        size={40}
                    />
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
