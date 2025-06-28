import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './register.scss'
import { loginAPI } from '@/services/api';

type FieldType = {
    email: string;
    password: string;
    fullName: string;
    phone: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await loginAPI("user@gmail.com", "123456");
    console.log(res);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const RegisterPage = () => {
    return (
        <div className="register-form-wrapper"    >
            <h2 className="register-form-header" >
                Register Form
            </h2>
            <Form

                name="basic"
                layout='vertical'
                style={{ maxWidth: 500, width: "100%" }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item<FieldType>
                    label="Full name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="E-mail"
                    name="email"
                    rules={[{
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }, { required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            type: "regexp",
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        },
                        { required: true, message: 'Please input your phone number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className="register-redirect">
                <span>Already have an account?</span>
                <Link to="/login"> Login</Link>
            </div>
        </div >
    )
}


export default RegisterPage;
