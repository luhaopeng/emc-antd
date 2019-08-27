import { Layout, Skeleton } from 'antd'
import React from 'react'
import './index.less'

const PagePlaceHolder: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content className='page-holder'>
      <div className='page-holder-div'>
        <Skeleton active={true} />
      </div>
    </Layout.Content>
  )
}

export default PagePlaceHolder
