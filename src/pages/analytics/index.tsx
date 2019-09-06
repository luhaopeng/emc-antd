import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import './index.less'

const CompPowerFactor = lazy(() => import('./power-factor'))
const CompPayload = lazy(() => import('./payload'))
const CompGraph = lazy(() => import('./graph'))
const CompThreePhases = lazy(() => import('./three-phases'))
const CompBalance = lazy(() => import('./balance'))
const CompAlert = lazy(() => import('./alert'))
const CompNotFound = lazy(() => import('../../pages/not-found'))

const PageAnalytics: React.FunctionComponent = (): JSX.Element => {
  return (
    <Suspense fallback={<PageHolder />}>
      <Switch>
        <Route path='/analytics/power-factor' component={CompPowerFactor} />
        <Route path='/analytics/payload' component={CompPayload} />
        <Route path='/analytics/graph' component={CompGraph} />
        <Route path='/analytics/three-phases' component={CompThreePhases} />
        <Route path='/analytics/balance' component={CompBalance} />
        <Route path='/analytics/alert' component={CompAlert} />
        <Route component={CompNotFound} />
      </Switch>
    </Suspense>
  )
}

export default PageAnalytics
