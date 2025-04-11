import { Delete, Edit, FilterList } from '@mui/icons-material';
import { Button, Modal, Space, Table, Typography } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';
import { toast } from 'react-toastify';
import axiosClient from '../apis/axiosClient';

const { Title, Text } = Typography;
const { confirm } = Modal;

const Suplliers = () => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [supplierSelected, setSuppliersSelected] = useState<SupplierModel>();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnProps<SupplierModel>[] = [
        {
            key: 'RowHead',
            title: 'No.',
            dataIndex: '_id',
            render: (_text: any, _record: SupplierModel, index: number) =>
                (page - 1) * pageSize + index + 1,
            align: 'center'
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Supplier name'
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Product'
        },
        {
            key: 'contact',
            dataIndex: 'contact',
            title: 'Contact'
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email'
        },
        {
            key: 'Type',
            dataIndex: 'isTaking',
            title: 'Type',
            render: (isTaking: boolean) => (
                <Text type={isTaking ? 'success' : 'danger'}>
                    {isTaking ? 'Taking return' : 'Not taking return'}
                </Text>
            )
        },
        {
            key: 'on',
            dataIndex: 'active',
            title: 'On the way',
            render: (num) => num ?? '-'
        },
        {
            key: 'buttonContainer',
            title: 'Actions',
            dataIndex: '',
            render: (item: SupplierModel) => (
                <Space>
                    <Button
                        onClick={() => {
                            setSuppliersSelected(item);
                            setIsVisibleModal(true);
                        }}
                        className='text-info'
                        type='text'
                        icon={<Edit style={{ fontSize: '18' }} />}
                    />
                    <Button
                        onClick={() =>
                            confirm({
                                title: 'Confirm',
                                content: 'Are you sure to remove?',
                                onOk: () => removeSupplier(item._id)
                            })
                        }
                        className='text-danger'
                        type='text'
                        icon={<Delete style={{ fontSize: '18' }} />}
                    />
                </Space>
            ),
            fixed: 'right',
            align: 'right'
        }
    ];

    useEffect(() => {
        getSuppliers();
    }, [page, pageSize]);

    const getSuppliers = async () => {
        setIsLoading(true);
        try {
            const response: any = await axiosClient.get(
                `supplier?page=${page}&pageSize=${pageSize}`
            );            
            console.log(response);
            if (response.data) {
                setSuppliers(response.data.items);
                setTotal(response.data.total)
            }
        } catch (error: any) {
            toast.error(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };

    const removeSupplier = async (id: String) => {
        try {
            const response = await axiosClient.put(`supplier/remove?id=${id}`, {
                isDeleted: true
            });
            getSuppliers();
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Table
                pagination={{
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => {
                        setPageSize(size);
                    },
                    total,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }
                }}
                scroll={{ y: 'calc(100vh - 300px)'}}
                rowKey='_id'
                loading={isLoading}
                dataSource={suppliers}
                columns={columns}
                title={() => (
                    <div className='row'>
                        <div className='col'>
                            <Title level={5}>Suppliers</Title>
                        </div>
                        <div className='col text-right'>
                            <Space>
                                <Button
                                    className='social-button'
                                    onClick={() => setIsVisibleModal(true)}
                                >
                                    Add Supplier
                                </Button>
                                <Button
                                    className='social-button'
                                    icon={
                                        <FilterList
                                            style={{ fontSize: '20' }}
                                        />
                                    }
                                >
                                    Filters
                                </Button>
                                <Button className='social-button'>
                                    Download all
                                </Button>
                            </Space>
                        </div>
                    </div>
                )}
            />

            <ToogleSupplier
                visible={isVisibleModal}
                onClose={() => {
                    supplierSelected && getSuppliers();
                    setSuppliersSelected(undefined);
                    setIsVisibleModal(false);
                }}
                onAddNew={(val) => setSuppliers([...suppliers, val])}
                supplier={supplierSelected}
            />
        </>
    );
};

export default Suplliers;
