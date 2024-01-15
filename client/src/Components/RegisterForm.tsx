import React, { useState } from 'react'
import { Button, Form, Input, Card } from 'antd';
import { Spin, Result } from 'antd'

type Props = {}

type FieldType = {
    username: string;
    email: string;
    password: string;
    remember?: string;
};



const RegisterForm = (props: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isRegistered, setRegistered] = useState<boolean>(false)

    const onFinish = (values: any) => {

        setLoading(true)

        const fetchRegister = async () => {
            let res = await fetch('https://ete-technology-assignment-server.onrender.com/api/register', {
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
            .then((res) => {
                console.log(res.message)
                setLoading(false);
                setRegistered(true);
            })
            .catch(err => {
                alert(err);
                setLoading(false)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const RegisteredMessage = () => {
        return <Result status="success"
            title="Successfully Registered!"
            subTitle="PLEASE LOGIN">

        </Result>
    }
    return (
        <Card title='REGISTER' bordered={false}>
            {isLoading ?
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:200,width:300}}>
                    <Spin size='large'/>
                </div>
                :
                <>
                    {isRegistered ? <RegisteredMessage /> : <Form action='' method='post'
                        name="login"
                        labelCol={{ span: 8 }
                        }
                        wrapperCol={{ span: 16 }
                        }
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
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4B49AC' }}>
                                REGISTER
                            </Button>
                        </Form.Item>
                    </Form >

                    }
                </>
            }
        </Card >
    )
}

export default RegisterForm