import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = (props: any) => {
  const { token, component: Component, ...rest } = props;

  return token ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route {...rest} component={Component} />
  );
};
