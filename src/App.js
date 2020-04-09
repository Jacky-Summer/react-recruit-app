import React from 'react';
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import './config'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Router>
    </Provider>
  );
}

export default App;
