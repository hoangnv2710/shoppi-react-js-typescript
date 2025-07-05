import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Select, Upload, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createProduct, uploadImage } from '@/services/product.service';


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

const CreateProductModal = (props: { reloadData: () => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState<UploadFile[]>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const uploadImages = async () => {
        let imgUrls: string[] = [];
        for (const imgFile of imageList) {
            if (imgFile.originFileObj) {
                const formData = new FormData();
                formData.append('fileImg', imgFile.originFileObj);
                const res = await uploadImage(formData);
                if (res.data) imgUrls = [...imgUrls, res.data.fileUploaded];
            }
        }
        return imgUrls;
    }

    const handleSubmit = async () => {
        const formData = form.getFieldsValue();
        const imgUrls = await uploadImages();
        const res = await createProduct(imgUrls[0], imgUrls, formData.mainText, "unknown", formData.price, formData.quantity, formData.category);
        if (res.data) {
            message.success("Product created successfully")
            props.reloadData();
            closeModal();
        } else {
            res.message.forEach(
                mess => message.error(mess)
            )
        }
    }

    const closeModal = () => {
        form.resetFields();
        setImageList([]);
        setIsModalOpen(false);

    };

    const handleBeforeUpload = (file: File): boolean => {
        const newFile: UploadFile = {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file),
            originFileObj: file,
        };
        console.log(newFile);
        setImageList((prev) => [...prev, newFile]);
        return false
    }

    const handleRemove = (file: UploadFile) => {
        setImageList((prev) => prev.filter((f) => f.uid !== file.uid));
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
                onCancel={closeModal}
                footer={
                    <>
                        <Button
                            onClick={handleSubmit}
                            form="myForm"
                            type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={closeModal}> Cancel</Button>
                    </>
                }
                maskClosable={false}
            >

                <Form
                    form={form}
                    id="myForm"
                    layout="vertical"
                >
                    <Form.Item
                        label="Product name"
                        name="mainText"
                        rules={[{ required: true, message: 'Please enter your product name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter the price of your product.!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: ' Please enter the quantity.!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Select category"
                        name="category"
                        rules={[{ required: true, message: ' Please select the category.!' }]}
                    >
                        <Select options={categories} />
                    </Form.Item>

                    <Form.Item label="Upload image">
                        <Upload listType="picture-card"
                            multiple
                            fileList={imageList}
                            beforeUpload={handleBeforeUpload}
                            onRemove={handleRemove}
                        >
                            <button
                                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default CreateProductModal;