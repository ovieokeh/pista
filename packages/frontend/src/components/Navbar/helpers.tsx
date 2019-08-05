import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '~reducers/interfaces';
import { LOGOUT } from '~reducers/types';

export interface iProps {
  auth: {
    token: string;
    user: User | null;
  };
  dispatch: any;
}

export const logout = (dispatch: any) => () => {
  window.localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const renderLinks = (props: iProps) => {
  if (props.auth.user) {
    const { user } = props.auth;

    const userAvatarUrl = user.avatarUrl || 'https://bit.ly/31iZMs0';
    return (
      <div id="dropdown-toggle" className="navbar__links__button">
        <img
          className="navbar__links__image"
          alt={user.firstName}
          src={userAvatarUrl}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Link
        className="navbar__links__link navbar__links__link--inverse"
        to="/signup"
      >
        Start Tracking
      </Link>
      <Link className="navbar__links__link" to="/login">
        Login
      </Link>
    </React.Fragment>
  );
};

export const renderDropdown = (dropdown: any, props: iProps) => {
  const { user } = props.auth;
  const userDetails = user as User;

  if (!userDetails) return;

  const userAvatarUrl = userDetails.avatarUrl || 'https://bit.ly/31iZMs0';

  return (
    <div ref={dropdown} className="navbar__dropdown">
      <div className="navbar__dropdown__user-details">
        <img
          className="navbar__dropdown__user-details__image"
          alt={userDetails.firstName}
          src={userAvatarUrl}
        />
        <p className="navbar__dropdown__user-details__text">{`${
          userDetails.firstName
        } ${userDetails.lastName}`}</p>
        <p className="navbar__dropdown__user-details__text">
          {userDetails.email}
        </p>
      </div>
      <div className="navbar__dropdown__links">
        <div className="navbar__dropdown__links__link">Dashboard</div>
        <div className="navbar__dropdown__links__link">Account settings</div>
        <div
          onClick={logout(props.dispatch)}
          className="navbar__dropdown__links__link"
        >
          Sign out
        </div>
      </div>
    </div>
  );
};
