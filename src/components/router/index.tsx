import React from 'react'
import { Route, Switch } from 'react-router-dom'

const HLRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path='/'
        component={require('../../pages/homepage').default}
      />
      <Route path='/data' component={require('../../pages/data').default} />
      <Route
        path='/analytics'
        component={require('../../pages/analytics').default}
      />
      <Route path='/stats' component={require('../../pages/stats').default} />
      <Route path='/report' component={require('../../pages/report').default} />
      <Route
        path='/prepaid'
        component={require('../../pages/prepaid').default}
      />
      <Route path='/icm' component={require('../../pages/icm').default} />
      <Route path='/esam' component={require('../../pages/esam').default} />
      <Route path='/docs' component={require('../../pages/docs').default} />
      <Route path='/manage' component={require('../../pages/manage').default} />
      <Route path='/system' component={require('../../pages/system').default} />
      <Route
        path='/maintain'
        component={require('../../pages/maintain').default}
      />
    </Switch>
  )
}

export default HLRouter
