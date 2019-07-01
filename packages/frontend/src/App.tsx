import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './routes';
import { history, ScrollToTop } from './utilities';
import { Homepage, Navbar, Notfound, Signup, Login, Setup } from './components';

function App() {
  return (
    <Router history={history}>
      <>
        <Navbar />
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <PublicRoute path="/signup" component={Signup} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/setup" component={Setup} />
            <Route component={Notfound} />
          </Switch>
        </ScrollToTop>
      </>
    </Router>
  );
}

export default App;
