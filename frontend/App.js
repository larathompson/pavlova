import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { Splashscreen } from './components/SplashScreen'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Users } from './components/GetUsers'
import { Preferences } from './components/Preferences'

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
          <Route exact path = '/preferences' component={Preferences} />
        </Switch>
      </main>
    </HashRouter>
  )
}

export default App