import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { Splashscreen } from './components/SplashScreen'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Users } from './components/GetUsers'

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <main>
        <Switch>
          <Route exact path='/' component={Splashscreen} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/pavlova' component={Users} />
        </Switch>
      </main>
    </HashRouter>
  )
}

export default App