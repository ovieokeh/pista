import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { authReducer } from '~reducers';
import { Navbar } from '~components';
import { Homepage, Signup, Error } from './pages';
import 'aos/dist/aos.css';

interface iProps {
  history: History;
  AOS: any;
}

const initialAuthState = {
  user: null,
  token: ''
};

const App: React.FunctionComponent<iProps> = props => {
  const [auth, dispatch] = React.useReducer(authReducer, initialAuthState);
  props.AOS.init();

  return (
    <Router history={props.history}>
      <Navbar auth={auth} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" render={() => <Signup dispatch={dispatch} />} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
