import React, { useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Select } from 'antd';

type FieldType = {
    mainText?: string;
    price?: number;
    quantity?: number;
    category?: string;
};

const categories: { value: string; label: string }[] = [
    { value: "Arts", label: "Arts" },
    { value: "Business", label: "Business" },
    { value: "Comics", label: "Comics" },
    { value: "Cooking", label: "Cooking" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "History", label: "History" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Teen", label: "Teen" },
    { value: "Travel", label: "Travel" },
]



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const CreateProductModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FieldType>();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        // form.getFieldValue("mainText" )
        console.log(form.getFieldsValue())
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);

    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create new
            </Button>
            <Modal
                title="Create new product"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                okText="Create"
                onCancel={handleCancel}
                footer={
                    <>
                        <Button
                            form="myForm"
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                }
                maskClosable={false}
            >

                <Form
                    form={form}
                    id="myForm"
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        label="Product name"
                        name="mainText"
                        rules={[{ required: true, message: 'Please enter your product name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter the price of your product.!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: ' Please enter the quantity.!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Select category"
                        name="category"
                        rules={[{ required: true, message: ' Please select the category.!' }]}
                    >

                        <Select options={categories} />

                    </Form.Item>
                </Form>

            </Modal>
        </>
    );

}

export default CreateProductModal;