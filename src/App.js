import React from 'react';
import store from './redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthRoute from '@components/authroute'
import Login from '@containers/login'
import Register from '@containers/register'
import './config'

function Boss () {
    return <div>boss</div>
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthRoute/>
        <Route path='/boss' component={Boss}></Route>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Router>
    </Provider>
  );
}

export default App;
