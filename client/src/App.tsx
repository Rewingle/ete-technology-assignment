import React, { useState } from 'react';
import { Button, Card, Layout, Flex, Divider } from 'antd';
import Header from './Components/Header';

import Routes from './Routes';
import FooterComponent from './Components/Footer';


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4B49AC',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%'
};

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  height: '100vh'
};

function App() {

  return (
    <Layout style={layoutStyle}>
      <Header />
      <Routes />
      <FooterComponent/>
    </Layout>
  );
}

export default App;
