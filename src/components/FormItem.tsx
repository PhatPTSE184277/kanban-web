import { Checkbox, Form, Input, Select } from 'antd';
import React from 'react';
import { FormItemModel } from '../models/FormModel';

interface Props {
    item: FormItemModel;
}

const FormItem = (props: Props) => {
    const { item } = props;
    
    const renderInput = (item: FormItemModel) => {
        let content = <></>;

        switch (item.type) {
            case 'checkbox':
                content = <Checkbox className='custom-checkbox' />;
                break;
            case 'select':
                content = <Select  options={item.lockup_item ?? []} />;
                break;
            default:
                content = (
                    <Input className='custom-input' type={item.type} placeholder={item.placeholder}/>
                );
                break;
        }

        return content;
    };

    return (
        <Form.Item
            key={item.key}
            name={item.value}
            label={item.label}
            valuePropName={item.type === 'checkbox' ? 'checked' : 'value'}
            rules={[
                {
                    required: item.required,
                    message: item.message
                }
            ]}
        >
            {renderInput(item)}
        </Form.Item>
    );
};

export default FormItem;
