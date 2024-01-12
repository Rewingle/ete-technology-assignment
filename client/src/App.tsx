import React, { useState } from 'react';
import { Button, Card, Layout, Flex, Divider } from 'antd';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
const { Footer, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: '100vh'
};

function App() {
  const [isRegisterVisible, setRegisterVisible] = useState(false)

  return (
    <Layout style={layoutStyle}>
      <Header />
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

      <Footer style={footerStyle}>ETE TECHNOLOGY ASSIGNMENT - MEHMET ALİ KUL</Footer>

    </Layout>




  );
}

export default App;
