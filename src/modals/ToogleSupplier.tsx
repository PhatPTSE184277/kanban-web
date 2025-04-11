/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Form, Input, Modal, Select, Typography } from 'antd';
import { User } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { color } from '../constants/color';
import { uploadFile } from '../utils/uploadFile';
import { replaceName } from '../utils/replaceName';
import axiosClient from '../apis/axiosClient';
import { toast } from 'react-toastify';
import { SupplierModel } from '../models/SupplierModel';
import { FormModel } from '../models/FormModel';
import FormItem from '../components/FormItem';

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
    const [isGetting, setIsGetting] = useState(false);
    const [isTaking, setIsTaking] = useState<boolean>();
    const [formData, setFormData] = useState<FormModel>();
    const [file, setFile] = useState<any>();

    const [form] = Form.useForm();
    const inpRef = useRef<any>();

    useEffect(() => {
        getFormData();
    }, []);

    useEffect(() => {
        if (supplier) {
            form.setFieldsValue(supplier);
            setIsTaking(supplier.isTaking === 1 ? true : false);
            setFile(undefined);
        }
    }, [supplier]);

    const addNewSupplier = async (values: any) => {
        // setIsLoading(true);

        const data: any = {};
        for (let i in values) {
            data[i] = values[i] ?? '';
        }
        data.price = values.price ? parseInt(values.price) : 0;
        data.isTaking = values.isTaking ? 1 : 0;

        if (file) {
            data.photoUrl = await uploadFile(file);
        }
        data.slug = replaceName(values.name);
        console.log(data)

        try {
          if (supplier) {
            const response: any = await axiosClient.put(
                'supplier/update',
                data
            );
            if (response.data) {
                toast.success(response.message);
                handleClose();
            }
          }else {
            const response: any = await axiosClient.post(
                'supplier/add-new',
                data
            );
            if (response.data) {
                toast.success(response.message);
                onAddNew(response.data);
                handleClose();
            }
          }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFormData = async () => {
        setIsGetting(true);
        try {
            const response = await axiosClient.get('supplier/get-form');
            if (response.data) {
                setFormData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsGetting(false);
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
                loading={isGetting}
                closable={!isLoading}
                open={visible}
                centered
                onClose={handleClose}
                onCancel={handleClose}
                onOk={() => form.submit()}
                title={supplier ? 'Update supplier' : 'Add Supplier'}
                okText={supplier ? 'Update supplier' : 'Add Supplier'}
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
                    ) : supplier ? (
                        <Avatar size={100} src={supplier.photoUrl} />
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
                {formData && (
                    <Form
                        disabled={isLoading}
                        onFinish={addNewSupplier}
                        layout={formData.layout}
                        labelCol={{ span: formData.labelCol }}
                        wrapperCol={{ span: formData.wrapperCol }}
                        size='middle'
                        form={form}
                    >
                        {formData.formItems.map((item) => (
                            <FormItem item={item}/>
                        ))}
                    </Form>
                )}

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
