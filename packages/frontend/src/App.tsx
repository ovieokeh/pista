import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history, ScrollToTop } from './utilities';
import { Homepage, Navbar, Notfound } from './components';

function App() {
  return (
    <Router history={history}>
      <>
        <Navbar />
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route component={Notfound} />
          </Switch>
        </ScrollToTop>
      </>
    </Router>
  );
}

export default App;
