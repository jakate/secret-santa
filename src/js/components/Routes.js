import React from 'react'
import { Route, Switch } from 'react-router'
import Welcome from '../pages/Welcome'
import NotFound from '../pages/NotFound'
import ThankYou from '../pages/ThankYou'
import FormPage from '../pages/FormPage'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/start" component={FormPage} />
      <Route exact path="/thank_you" component={ThankYou} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
