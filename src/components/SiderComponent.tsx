import { Layout, Menu, MenuProps, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DescriptionIcon from '@mui/icons-material/Description';
import { appInfo } from '../constants/appInfos';
import { color } from '../constants/color';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
    const items: MenuItem[] = [
        {
            key: 'dashboard',
            label: <Link to={'/'}>Dashboard</Link>,
            icon: <HomeIcon />
        },
        {
            key: 'inventory',
            label: <Link to={'/inventory'}>Inventory</Link>,
            icon: <AssignmentIcon />
        },
        {
            key: 'report',
            label: <Link to={'/reports'}>Reports</Link>,
            icon: <BarChartIcon />
        },
        {
            key: 'suppliers',
            label: <Link to={'/suppliers'}>Suppliers</Link>,
            icon: <PersonIcon />
        },
        {
            key: 'orders',
            label: <Link to={'/orders'}>Orders</Link>,
            icon: <Inventory2Icon />
        },
        {
            key: 'manageStore',
            label: <Link to={'/manage-store'}>Manage Store</Link>,
            icon: <DescriptionIcon />
        }
    ];

    return (
        <Sider theme='light' style={{height: '100vh'}}>
            <div className='p-2 d-flex align-items-center'>
                <img src={appInfo.logo} alt={appInfo.title} width={48} />
                <Text
                    style={{
                        fontWeight: '600',
                        fontSize: '1.5rem',
                        color: color.primaryColor,
                    }}
                >
                    {appInfo.title}
                </Text>
            </div>
            <Menu items={items} theme='light' />
        </Sider>
    );
};

export default SiderComponent;
