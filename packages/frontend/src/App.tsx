import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { authReducer } from '~reducers';
import { Navbar } from '~components';
import { Homepage, Signup, Login, Error, Setup } from './pages';
import { PublicRoute, PrivateRoute } from './routes';
import 'aos/dist/aos.css';

interface iProps {
  history: History;
  AOS: any;
}

function getInitialState() {
  return (
    JSON.parse(localStorage.getItem('auth') as string) || {
      user: null,
      token: '',
    }
  );
}

const App: React.FunctionComponent<iProps> = props => {
  const initialAuthState = getInitialState();
  const [auth, dispatch] = React.useReducer(authReducer, initialAuthState);
  props.AOS.init({
    once: true,
    offset: 0,
  });

  props.history.listen(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Router history={props.history}>
      <Navbar auth={auth} dispatch={dispatch} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <PublicRoute
          token={auth.token}
          path="/signup"
          render={() => <Signup history={props.history} dispatch={dispatch} />}
        />
        <PublicRoute
          token={auth.token}
          path="/login"
          render={() => <Login history={props.history} dispatch={dispatch} />}
        />
        <PrivateRoute
          token={auth.token}
          path="/setup"
          render={() => (
            <Setup history={props.history} dispatch={dispatch} auth={auth} />
          )}
        />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
