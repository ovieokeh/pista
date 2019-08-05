import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = (props: any) => {
  const { token, component: Component, ...rest } = props;

  return !token ? (
    <Redirect to="/login" />
  ) : (
    <Route {...rest} component={Component} />
  );
};
