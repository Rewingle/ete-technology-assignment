import { Button, Checkbox, Form, Input, Card } from 'antd';
import React, { useState } from 'react'
import { useAuth } from '../utils/authProvider';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd'


type Props = {}
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const LoginForm = (props: Props) => {

    const { setToken }: any = useAuth();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false)

    const onFinish = (values: any) => {
        const fetchLogin = async () => {
            let res = await fetch('https://ete-technology-assignment-server.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            let data = res.json();
            return data;
        }
        setLoading(true)

        fetchLogin()
            .then((res) => {
                if (res.ok || res.token) {


                    setToken(res.token);
                    navigate("/", { replace: true })

                }else{
                    alert(res.message)
                    setLoading(false)
                }

            }).catch(err => { console.log(err); setLoading(false) })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Card title='LOGIN' bordered={false}>
            {isLoading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 300 }}>
                    <Spin size='large' />
                </div>
                :
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
                        rules={[{ message: 'Please input your username!' }, { required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ message: 'Please input your password!' }, { required: true }]}
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
                        <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4B49AC' }}>
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>}
        </Card>

    )
}
export default LoginForm