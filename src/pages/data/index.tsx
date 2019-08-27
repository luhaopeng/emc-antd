import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../components/page-loading'

const PageData: React.FunctionComponent = (): JSX.Element => {
  const CompRealtime = () => (
    <Loading src={React.lazy(() => import('./realtime'))} />
  )
  const CompMeter = () => <Loading src={React.lazy(() => import('./meter'))} />
  const CompUsage = () => <Loading src={React.lazy(() => import('./usage'))} />

  return (
    <Switch>
      <Route path='/data/realtime' component={CompRealtime} />
      <Route path='/data/meter' component={CompMeter} />
      <Route path='/data/usage' component={CompUsage} />
    </Switch>
  )
}

export default PageData
