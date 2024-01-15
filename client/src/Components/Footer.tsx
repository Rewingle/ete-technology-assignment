import React from 'react'
import { Layout } from 'antd';

const { Footer } = Layout;
type Props = {}

const FooterComponent = (props: Props) => {
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4B49AC',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%'
    };

    return (
        <Footer style={footerStyle}>ETE TECHNOLOGY ASSIGNMENT - MEHMET ALİ KUL<br />https://github.com/Rewingle/ete-technology-assignment</Footer>

    )
}
export default FooterComponent