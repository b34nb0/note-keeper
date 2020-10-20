import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {

  return (

    <Router>
      <Switch>
        <Route exact path={"/"}
          render={ () => (
            <Home />
          )}
        />
        <Route exact path={"/login"}
          render={() => (
            <Login />
          )}
        />
        <Route exact path={"/register"}
          render={() => (
            <Register />
          )}
        />
      </Switch>
      
    </Router>

  );

}

export default App;
