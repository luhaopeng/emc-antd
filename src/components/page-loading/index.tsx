import { Button } from 'antd'
import React from 'react'
import Loadable from 'react-loadable'
import './index.less'

const PageLoading: React.FunctionComponent<Loadable.LoadingComponentProps> = (
  props: Loadable.LoadingComponentProps
): null | JSX.Element => {
  if (props.error) {
    return (
      <div className='page-loading'>
        页面载入错误！
        <Button onClick={props.retry}>重试</Button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div className='page-loading'>载入中...</div>
  } else {
    return null
  }
}

export default PageLoading
