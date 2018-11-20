import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import Dashboard from '../pages/Dashboard';
import Ad from '../pages/Ad';
import Login from '../pages/Login';
import Feedback from '../pages/Feedback';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={HomeLayout} breadcrumbName="控制台">
      <IndexRoute component={Dashboard} breadcrumbName="首页"/>
      <Route path="/ad" component={Ad} breadcrumbName="广告订单" />
      <Route path="/feedback" component={Feedback} />
    </Route>
    <Route path="/login" component={Login} />
  </Router>
)
