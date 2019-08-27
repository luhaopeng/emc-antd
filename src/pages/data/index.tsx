import { Skeleton } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const PageData: React.FunctionComponent = (): JSX.Element => {
  const CompRealtime = lazy(() => import('./realtime'))
  const CompMeter = lazy(() => import('./meter'))
  const CompUsage = lazy(() => import('./usage'))

  return (
    <Suspense fallback={<Skeleton active={true} />}>
      <Switch>
        <Route path='/data/realtime' component={CompRealtime} />
        <Route path='/data/meter' component={CompMeter} />
        <Route path='/data/usage' component={CompUsage} />
      </Switch>
    </Suspense>
  )
}

export default PageData
