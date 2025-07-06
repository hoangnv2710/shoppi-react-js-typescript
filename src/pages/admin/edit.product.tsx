import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Upload, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deleteProduct, updateProduct, uploadImage } from '@/services/product.service';


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
interface IProps {
    reloadData: () => void;
    productData: IProductDetail | undefined;
    setProductData: (v: IProductDetail | undefined) => void;
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
}
const EditProductModal = (props: IProps) => {
    const { isModalOpen, setIsModalOpen, setProductData, productData } = props;
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (productData) {
            form.setFieldsValue({
                mainText: productData.mainText,
                price: productData.price,
                quantity: productData.quantity,
                category: productData.category,
            });

            const images: UploadFile[] = productData.slider.map((image) =>
            ({
                uid: image,
                name: image,
                status: "done",
                url: import.meta.env.VITE_BACKEND_URL + `/images/book/${image}`,

            }))
            console.log(images)
            setImageList(images);
        }
    }, [productData]);

    const uploadImages = async () => {
        console.log(imageList);
        let imgUrls: string[] = [];
        for (const imgFile of imageList) {
            if (imgFile.originFileObj) {
                const formData = new FormData();
                formData.append('fileImg', imgFile.originFileObj);
                const res = await uploadImage(formData);
                if (res.data) imgUrls = [...imgUrls, res.data.fileUploaded];
            } else {
                imgUrls = [...imgUrls, imgFile.name]
            }
        }

        return imgUrls;
    }

    const handleSubmit = async () => {
        const formData = form.getFieldsValue();
        const imgUrls = await uploadImages();
        console.log(imgUrls)
        console.log(formData)
        const res = await updateProduct(productData._id, { thumbnail: imgUrls[0], slider: imgUrls, author: "unknown", ...formData })
        // const res = await createProduct(imgUrls[0], imgUrls, formData.mainText, "unknown", formData.price, formData.quantity, formData.category);
        if (res.data) {
            message.success("Update created successfully")
            props.reloadData();
            closeModal();
        } else {
            res.message.forEach(
                mess => message.error(mess)
            )
        }
    }

    const handleDelete = async () => {
        const res = await deleteProduct(productData?._id);
        props.reloadData();
        closeModal();
    }

    const closeModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setImageList([]);
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
            <Modal
                title="Create new product"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                okText="Create"
                onCancel={closeModal}
                destroyOnClose
                footer={
                    <>
                        <Popconfirm
                            title="Warning"
                            description="Are you sure to delete this product?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger> Delete</Button>
                        </Popconfirm>

                        <Button
                            onClick={handleSubmit}
                            form="myForm"
                            type="primary" htmlType="submit">Update</Button>
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

export default EditProductModal;