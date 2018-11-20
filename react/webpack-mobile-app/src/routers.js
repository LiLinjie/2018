import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Tasks from './pages/Tasks';
import Lottery from './pages/Lottery';
import InviteFriend from './pages/InviteFriend';
import TaskDetail from './pages/TaskDetail';
import IncomeRecord from './pages/IncomeRecord';
import CheckDetail from './pages/CheckDetail';
import UploadTaskOrder from './pages/UploadTaskOrder';
import NoviceTaskDetail from './pages/NoviceTaskDetail';
import NoviceTasks from './pages/NoviceTasks';
import NoviceStrategy from './pages/NoviceStrategy';
import Page404 from './pages/Page404';
import createAuthPage from './pages/createAuthPage';

const getRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={createAuthPage(Tasks)}/>
      <Route path="/tasks" component={createAuthPage(Tasks)}/>
      <Route path="/taskDetail" component={createAuthPage(TaskDetail)}/>
      <Route path="/incomeRecord" component={createAuthPage(IncomeRecord)}/>
      <Route path="/CheckDetail" component={createAuthPage(CheckDetail)}/>
      <Route path="/uploadTaskOrder" component={createAuthPage(UploadTaskOrder)}/>
      <Route path="/noviceTaskDetail" component={createAuthPage(NoviceTaskDetail)}/>
      <Route path="/noviceTasks" component={createAuthPage(NoviceTasks)}/>
      <Route path="/noviceStrategy" component={createAuthPage(NoviceStrategy)}/>
      <Route path="/lottery" component={createAuthPage(Lottery)}/>
      <Route path="/inviteFriend" component={createAuthPage(InviteFriend)}/>
      <Route path="/*" component={Page404}/>
    </Switch>
  </Router>
);

export default getRouter;
