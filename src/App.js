import React from 'react';
import store from './redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from '@components/authroute'
import Login from '@containers/login'
import Register from '@containers/register'
import BossInfo from '@containers/bossinfo'
import GinusInfo from '@containers/geniusinfo'
import Dashboard from '@components/dashboard'
import Chat from '@components/chat'
import './config'
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthRoute/>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GinusInfo}/>
          <Route path='/chat/:user' component={Chat}/>
          <Route component={Dashboard}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
