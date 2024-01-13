import React from 'react'
import { Button } from 'antd'
import { useAuth } from '../utils/authProvider'

type Props = {}

const Reports = (props: Props) => {
  const token = useAuth();
  const onClick = async () => {
    let res = await fetch('http://localhost:5000/api/getUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })
    res.json().then((resJson)=>{
      console.log(resJson)
    })
  }

  return (
    <div>
      <Button type="primary" onClick={onClick} style={{ width: '100%', backgroundColor: '#4B49AC' }}>
        SEND
      </Button>
    </div>
  )
}
export default Reports