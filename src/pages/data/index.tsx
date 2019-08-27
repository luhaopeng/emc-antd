import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../components/page-loading'

const PageData: React.FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
      <Route
        path='/data/realtime'
        component={Loadable({
          loader: () => import('./realtime'),
          loading: Loading
        })}
      />
      <Route
        path='/data/meter'
        component={Loadable({
          loader: () => import('./meter'),
          loading: Loading
        })}
      />
      <Route
        path='/data/usage'
        component={Loadable({
          loader: () => import('./usage'),
          loading: Loading
        })}
      />
    </Switch>
  )
}

export default PageData
