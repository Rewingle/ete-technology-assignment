import { Button, Checkbox, Form, Input, Card } from 'antd';
import React from 'react'

type Props = {}
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish = (values: any) => {
    const fetchLogin = async()=>{
        let res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        let data = res.json();
        return data;
    }
    fetchLogin()
   .then((res) => {alert(res.isAuth)}).catch(err=>console.log(err))
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const LoginForm = (props: Props) => {
    return (
        <Card title='LOGIN' bordered={false}>
            <Form
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
                    rules={[{ message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    style={{ width: '100%', display: 'flex', justifyContent: 'right' }}
                >
                    <Checkbox style={{ width: '9em' }}>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 64 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        LOGIN
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    )
}
export default LoginForm