import type { FormProps } from 'antd';
import { Button, Form, Input, App } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.scss'
import { loginAPI } from 'services/api';
import { useAuthContext } from 'components/context/auth.context';
import { useEffect } from 'react';


type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const { message } = App.useApp();
    const { setIsAuthentication, setUserData, isAuthentication, setIsFetching } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthentication) navigate("/");
    }, [isAuthentication])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;
        setIsFetching(true);
        const res = await loginAPI(username, password);
        if (res?.data) {
            setUserData(res.data.user);
            localStorage.setItem('access_token', res.data.access_token);
            message.success("Login Successful!");
            setIsAuthentication(true);
        } else {
            message.error(res.message);
        };
        setIsFetching(false);
    };

    return (
        <div className="form-wrapper"    >
            <h2 className="form-header" >
                Login Form
            </h2>
            <Form
                name="basic"
                layout='vertical'
                style={{ width: "100%" }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
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

                <Form.Item label={null} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <div className="form-redirect">
                <span>Don’t have an account?</span>
                <Link to="/register"> Create an account</Link>
            </div>
        </div >
    )
}


export default LoginPage;