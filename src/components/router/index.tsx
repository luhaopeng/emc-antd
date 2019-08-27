import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '../page-loading'

const HLRouter = () => {
  const CompHome = () => (
    <Loading src={React.lazy(() => import('../../pages/homepage'))} />
  )
  const CompData = () => (
    <Loading src={React.lazy(() => import('../../pages/data'))} />
  )
  const CompAnalysis = () => (
    <Loading src={React.lazy(() => import('../../pages/analytics'))} />
  )
  const CompStats = () => (
    <Loading src={React.lazy(() => import('../../pages/stats'))} />
  )
  const CompReport = () => (
    <Loading src={React.lazy(() => import('../../pages/report'))} />
  )
  const CompPrepaid = () => (
    <Loading src={React.lazy(() => import('../../pages/prepaid'))} />
  )
  const CompIcm = () => (
    <Loading src={React.lazy(() => import('../../pages/icm'))} />
  )
  const CompEsam = () => (
    <Loading src={React.lazy(() => import('../../pages/esam'))} />
  )
  const CompDocs = () => (
    <Loading src={React.lazy(() => import('../../pages/docs'))} />
  )
  const CompManage = () => (
    <Loading src={React.lazy(() => import('../../pages/manage'))} />
  )
  const CompSystem = () => (
    <Loading src={React.lazy(() => import('../../pages/system'))} />
  )
  const CompMaintain = () => (
    <Loading src={React.lazy(() => import('../../pages/maintain'))} />
  )
  const CompNotFound = () => (
    <Loading src={React.lazy(() => import('../../pages/not-found'))} />
  )

  return (
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
  )
}

export default HLRouter
