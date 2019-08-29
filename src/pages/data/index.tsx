import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import './index.less'

const CompRealtime = lazy(() => import('./realtime'))
const CompMeter = lazy(() => import('./meter'))
const CompUsage = lazy(() => import('./usage'))
const CompNotFound = lazy(() => import('../../pages/not-found'))

const PageData: React.FunctionComponent = (): JSX.Element => {
  return (
    <Suspense fallback={<PageHolder />}>
      <Switch>
        <Route path='/data/realtime' component={CompRealtime} />
        <Route path='/data/meter' component={CompMeter} />
        <Route path='/data/usage' component={CompUsage} />
        <Route component={CompNotFound} />
      </Switch>
    </Suspense>
  )
}

export default PageData
