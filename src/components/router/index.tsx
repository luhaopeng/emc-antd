import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'
import Loading from '../page-loading'

const HLRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path='/'
        component={Loadable({
          loader: () => import('../../pages/homepage'),
          loading: Loading
        })}
      />
      <Route
        path='/data'
        component={Loadable({
          loader: () => import('../../pages/data'),
          loading: Loading
        })}
      />
      <Route
        path='/analytics'
        component={Loadable({
          loader: () => import('../../pages/analytics'),
          loading: Loading
        })}
      />
      <Route
        path='/stats'
        component={Loadable({
          loader: () => import('../../pages/stats'),
          loading: Loading
        })}
      />
      <Route
        path='/report'
        component={Loadable({
          loader: () => import('../../pages/report'),
          loading: Loading
        })}
      />
      <Route
        path='/prepaid'
        component={Loadable({
          loader: () => import('../../pages/prepaid'),
          loading: Loading
        })}
      />
      <Route
        path='/icm'
        component={Loadable({
          loader: () => import('../../pages/icm'),
          loading: Loading
        })}
      />
      <Route
        path='/esam'
        component={Loadable({
          loader: () => import('../../pages/esam'),
          loading: Loading
        })}
      />
      <Route
        path='/docs'
        component={Loadable({
          loader: () => import('../../pages/docs'),
          loading: Loading
        })}
      />
      <Route
        path='/manage'
        component={Loadable({
          loader: () => import('../../pages/manage'),
          loading: Loading
        })}
      />
      <Route
        path='/system'
        component={Loadable({
          loader: () => import('../../pages/system'),
          loading: Loading
        })}
      />
      <Route
        path='/maintain'
        component={Loadable({
          loader: () => import('../../pages/maintain'),
          loading: Loading
        })}
      />
    </Switch>
  )
}

export default HLRouter
