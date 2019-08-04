import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import { useToggleDropdown } from './useToggleDropdown';
import './Navbar.scss';

const renderLinks = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <div id="dropdown-toggle" className="navbar__links__button">
        <img
          className="navbar__links__image"
          alt="ovie"
          src="https://img.icons8.com/material/26/000000/user-male-circle--v1.png"
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

interface iProps {
  auth: any;
}

const Navbar: React.FunctionComponent<iProps> = () => {
  const dropdown = React.useRef<HTMLDivElement>(null);
  useToggleDropdown(dropdown);

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar__logo" alt="Pista" src={Logo} />
      </Link>
      <div className="navbar__links">{renderLinks(true)}</div>
      <div ref={dropdown} className="navbar__dropdown">
        <div className="navbar__dropdown__user-details">
          <img
            className="navbar__dropdown__user-details__image"
            alt="buzz"
            src="https://img.icons8.com/material/26/000000/user-male-circle--v1.png"
          />
          <p className="navbar__dropdown__user-details__text">Buzz Lightyear</p>
          <p className="navbar__dropdown__user-details__text">
            buzz@lightyear.com
          </p>
        </div>
        <div className="navbar__dropdown__links">
          <div className="navbar__dropdown__links__link">Dashboard</div>
          <div className="navbar__dropdown__links__link">Account settings</div>
          <div className="navbar__dropdown__links__link">Sign out</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
