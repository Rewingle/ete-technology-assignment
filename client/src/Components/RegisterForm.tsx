import React from 'react'
import { Button, Checkbox, Form, Input, Card, message } from 'antd';

type Props = {}

type FieldType = {
    username: string;
    email: string;
    password: string;
    remember?: string;
};

const onFinish = (values: any) => {
    const fetchRegister = async () => {
        let res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        let data = res.json();
        return data;
    }
    fetchRegister()
        .then((res) => { alert(res.message) }).catch(err => console.log(err))
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RegisterForm = (props: Props) => {
    return (
        <Card title='REGISTER' bordered={false}>
            <Form action='' method='post'
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ message: 'Please input your username!' }, { min: 4, message: 'Username must be minimum 4 characters' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ message: 'Invalid Email!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ message: 'Please input your password!' }, { min: 6, message: 'Password must be minimum 6 characters' }]}
                >
                    <Input.Password />
                </Form.Item>
                <br />
                <Form.Item wrapperCol={{ span: 64 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        REGISTER
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default RegisterForm