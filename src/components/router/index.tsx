import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHoder from '../page-holder'

const HLRouter = () => {
  const CompHome = lazy(() => import('../../pages/homepage'))
  const CompData = lazy(() => import('../../pages/data'))
  const CompAnalysis = lazy(() => import('../../pages/analytics'))
  const CompStats = lazy(() => import('../../pages/stats'))
  const CompReport = lazy(() => import('../../pages/report'))
  const CompPrepaid = lazy(() => import('../../pages/prepaid'))
  const CompIcm = lazy(() => import('../../pages/icm'))
  const CompEsam = lazy(() => import('../../pages/esam'))
  const CompDocs = lazy(() => import('../../pages/docs'))
  const CompManage = lazy(() => import('../../pages/manage'))
  const CompSystem = lazy(() => import('../../pages/system'))
  const CompMaintain = lazy(() => import('../../pages/maintain'))
  const CompNotFound = lazy(() => import('../../pages/not-found'))

  return (
    <Suspense fallback={<PageHoder />}>
      <Switch>
        <Route exact={true} path='/' component={CompHome} />
        <Route path='/data' component={CompData} />
        <Route path='/analytics' component={CompAnalysis} />
        <Route path='/stats' component={CompStats} />
        <Route path='/report' component={CompReport} />
        <Route path='/prepaid' component={CompPrepaid} />
        <Route path='/icm' component={CompIcm} />
        <Route path='/esam' component={CompEsam} />
        <Route path='/docs' component={CompDocs} />
        <Route path='/manage' component={CompManage} />
        <Route path='/system' component={CompSystem} />
        <Route path='/maintain' component={CompMaintain} />
        <Route component={CompNotFound} />
      </Switch>
    </Suspense>
  )
}

export default HLRouter
