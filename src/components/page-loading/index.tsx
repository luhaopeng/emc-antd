import { Skeleton } from 'antd'
import React from 'react'

interface ILoadingProp {
  src: React.LazyExoticComponent<React.ComponentType<any>>
}

const PageLoading = ({ src: Page }: ILoadingProp) => {
  return (
    <React.Suspense fallback={<Skeleton active={true} />}>
      <Page />
    </React.Suspense>
  )
}

export default PageLoading
