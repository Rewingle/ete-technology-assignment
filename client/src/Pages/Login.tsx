import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import { Button, Card, Layout, Flex, Divider } from 'antd';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';

const { Footer, Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

const Login = () => {
    const [isRegisterVisible, setRegisterVisible] = useState(false)

    return (
        <Content style={contentStyle}>
            <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>

                {isRegisterVisible ?
                    <div>
                        <RegisterForm />
                        <Button type="text" htmlType="submit" style={{ width: '100%', boxShadow: '0px 0px 3px MidnightBlue' }}
                            onClick={() => { setRegisterVisible(false) }}>
                            Login
                        </Button>
                    </div>
                    :
                    <div>
                        <LoginForm />

                        <Card bordered={false} style={{ marginTop: '2em' }}>

                            <Divider>Don't You Have Account?</Divider>
                            <br />
                            <Button type="text" htmlType="submit" style={{ width: '100%', boxShadow: '0px 0px 3px MidnightBlue' }}
                                onClick={() => { setRegisterVisible(true) }}>
                                Register
                            </Button>
                        </Card>
                    </div>
                }

            </Flex>

        </Content>
    )
};

export default Login;