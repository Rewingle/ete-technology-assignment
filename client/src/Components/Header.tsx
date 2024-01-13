import React, { useEffect, useState } from 'react'
import { Col, Row, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useAuth } from "../utils/authProvider";
import jwt from 'jsonwebtoken'

type Props = {}

const Header = (props: Props) => {
  const [currentMenu, setCurrentMenu] = useState<any>();
  const { setToken }: any = useAuth();
  const { token }: any = useAuth();
  const [username,setUsername] = useState(null)
  useEffect(() => {
    const SECRET: any = process.env.JWT_SECRET
    const user = jwt.verify(token, SECRET)
    alert(user)
  }, [token])
  //const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    window.location.pathname = '/'
  };

  const menuItems: MenuProps['items'] = [
    {
      label: <a href='/reports'>Reports</a>,
      key: 'report',
    },
    {
      label: <a href='/companies'>Companies</a>,
      key: 'companies',
    },
    {
      label: <a href='/products'>Products</a>,
      key: 'products',
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: 'logout',
    },
  ]
  const onClick: MenuProps['onClick'] = e => {
    setCurrentMenu(e.key)
  }

  return (
    <div style={{ width: '100%', height: '6em', backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>

      <Row style={{ height: '100%' }}>
        <Col span={8}>
          <div style={{ fontWeight: 700, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            💿 ETE TECHNOLOGY <br />
            ASSIGNMENT
          </div>
        </Col>
        {token ? <Col span={16} style={{ borderLeft: '2px solid gray', backgroundColor: 'red' }}>
          <Menu style={{ width: '100%', height: '100%', fontSize: '18px', gap: '1em' }}
            onClick={onClick}
            selectedKeys={[currentMenu]}
            mode='horizontal'
            items={menuItems}

          />
        </Col> : null}
      </Row>

    </div>
  )
}

export default Header