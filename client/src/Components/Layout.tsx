import React from 'react'
import Header from './Header'
import FooterComponent from './Footer'
import { Outlet, Link } from "react-router-dom";
type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <Header />
            <Outlet />
            <FooterComponent />
        </>
    )
}
export default Layout