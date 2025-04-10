import { FilterList } from '@mui/icons-material';
import { Button, Space, Table, Typography } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useState } from 'react';
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';

const { Title } = Typography;

const Suplliers = () => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const columns: ColumnProps<SupplierModel>[] = [];

    return (
        <>
            <Table
                dataSource={[]}
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
                onClose={() => setIsVisibleModal(false)}
                onAddNew={(val) => console.log(val)}
            />
        </>
    );
};

export default Suplliers;
