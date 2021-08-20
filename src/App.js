import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblesPage from './components/BubblePage'
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";
import { axiosWithAuth } from "./helpers/axiosWithAuth";

function App() {
  const logout = () => {
    axiosWithAuth().post('/logout')
      .then(res => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      })
      .catch(err => {
        JSON.stringify(err)
      })
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/" onClick={logout}>logout</a>
        </header>
        <Switch>
          <PrivateRoute exact path='/bubbles' component={BubblesPage} />
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//X. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//X. Render BubblePage as a PrivateRoute
//X. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.