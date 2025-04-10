import { Avatar, Button, Form, Input, Modal, Select, Typography } from 'antd';
import { User } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import { color } from '../constants/color';
import { uploadFile } from '../utils/uploadFile';
import { replaceName } from '../utils/replaceName';
import axiosClient from '../apis/axiosClient';
import { toast } from 'react-toastify';
import { SupplierModel } from '../models/SupplierModel';

interface Props {
    visible: boolean;
    onClose: () => void;
    onAddNew: (val: SupplierModel) => void;
    supplier?: SupplierModel;
}

const { Paragraph } = Typography;

const ToogleSupplier = (props: Props) => {
    const { visible, onClose, onAddNew, supplier } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isTaking, setIsTaking] = useState<boolean>();
    const [file, setFile] = useState<any>();

    const [form] = Form.useForm();
    const inpRef = useRef<any>();

    const addNewSupplier = async (values: any) => {
        setIsLoading(true);

        const data: any = {};
        for(let i in values){
            data[i] = values[i] ?? ''
        }
        data.price = values.price ? parseInt(values.price) : 0;
        data.isTaking = isTaking ? 1 : 0;
        
        if (file) {
            data.photoUrl = await uploadFile(file);
        };
        data.slug = replaceName(values.name);

        try {
            const response = await axiosClient.post('supplier/add-new', data);
            if (response.data) {
                toast.success(response.data.message);
                onAddNew(response.data.data);
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        setFile(undefined);
        setIsTaking(undefined);
        onClose();
    };

    return (
        <>
            <Modal
                closable={!isLoading}
                open={visible}
                centered
                onClose={handleClose}
                onCancel={handleClose}
                onOk={() => form.submit()}
                title='Add Supplier'
                okText='Add Supplier'
                cancelText='Discard'
                okButtonProps={{
                    className: 'custom-button',
                    loading: isLoading,
                    type: 'primary'
                }}
                cancelButtonProps={{
                    className: 'social-button',
                    type: 'default'
                }}
            >
                <label htmlFor='inpFile' className='p-2 mb-3 row text-center'>
                    {file ? (
                        <Avatar size={100} src={URL.createObjectURL(file)} />
                    ) : (
                        <Avatar
                            size={100}
                            style={{
                                backgroundColor: 'white',
                                border: '1px dashed #e0e0e0'
                            }}
                        >
                            <User size={80} color={color.grey600} />
                        </Avatar>
                    )}

                    <div className='ml-3'>
                        <Paragraph className='text-muted m-0'>
                            Drag image here
                        </Paragraph>
                        <Paragraph className='text-muted mb-1'>Or</Paragraph>
                        <Button
                            className='custom-link'
                            onClick={() => inpRef.current.click()}
                            type='link'
                        >
                            Browse image
                        </Button>
                    </div>
                </label>

                <Form
                    disabled={isLoading}
                    onFinish={addNewSupplier}
                    layout='horizontal'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    size='middle'
                    form={form}
                >
                    <Form.Item
                        name={'name'}
                        label='Supplier name'
                        rules={[
                            {
                                required: true,
                                message: 'Enter supplier name'
                            }
                        ]}
                    >
                        <Input
                            className='custom-input'
                            placeholder='Enter supplier name'
                        />
                    </Form.Item>

                    <Form.Item name={'product'} label='Product'>
                        <Input
                            className='custom-input'
                            placeholder='Enter product'
                        />
                    </Form.Item>

                    <Form.Item name={'categories'} label='Category'>
                        <Select
                            options={[]}
                            placeholder='Select product category'
                        />
                    </Form.Item>

                    <Form.Item name={'price'} label='Buying Price'>
                        <Input
                            className='custom-input'
                            placeholder='Enter buying price'
                            type='number'
                        />
                    </Form.Item>

                    <Form.Item name={'contact'} label='Contact Number'>
                        <Input
                            className='custom-input'
                            placeholder='Enter supplier contact number'
                        />
                    </Form.Item>

                    <Form.Item label='Type'>
                        <div className='mb-2'>
                            <Button
                                size='middle'
                                onClick={() => setIsTaking(false)}
                                className={
                                    isTaking === false
                                        ? 'custom-button'
                                        : 'social-button'
                                }
                            >
                                Not taking return
                            </Button>
                        </div>
                        <Button
                            size='middle'
                            onClick={() => setIsTaking(true)}
                            className={
                                isTaking ? 'custom-button' : 'social-button'
                            }
                        >
                            Taking return
                        </Button>
                    </Form.Item>
                </Form>

                <div className='d-none'>
                    <input
                        ref={inpRef}
                        accept='image/*'
                        type='file'
                        name=''
                        id='inpFile'
                        onChange={(e: any) => setFile(e.target.files[0])}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ToogleSupplier;
