import type { FormProps } from 'antd';
import { Button, Form, Input, App } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.scss'
import { registerAPI } from '@/services/api';

type FieldType = {
    email: string;
    password: string;
    fullName: string;
    phone: string;
};


const RegisterPage = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, email, password, phone } = values;
        const res = await registerAPI(fullName, email, password, phone);
        if (res?.data) {
            message.success("Registration Successful!");
            navigate("/login");
        } else {
            message.error(res.message);
        };
    };


    return (
        <div className="form-wrapper"    >
            <h2 className="form-header" >
                Register Form
            </h2>
            <Form
                name="basic"
                layout='vertical'
                style={{ width: "100%" }}
                onFinish={onFinish}
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <div className="form-redirect">
                <span>Already have an account?</span>
                <Link to="/login"> Login</Link>
            </div>
        </div >
    )
}


export default RegisterPage;
