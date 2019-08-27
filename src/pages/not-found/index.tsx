import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <Result
    status='404'
    title='404'
    subTitle='您访问的地址不存在'
    extra={
      <Link to='/'>
        <Button type='primary'>回到首页</Button>
      </Link>
    }
  />
)

export default NotFound
