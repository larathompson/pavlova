import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { Register } from './components/Register'
import { Login } from './components/Login'

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <main>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </main>
    </HashRouter>
  )
}

export default App