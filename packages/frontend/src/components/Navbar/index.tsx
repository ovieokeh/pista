import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import { useToggleDropdown } from './useToggleDropdown';
import { iProps, renderDropdown, renderLinks } from './helpers';
import './Navbar.scss';

export const Navbar: React.FunctionComponent<iProps> = props => {
  const dropdown = React.useRef<HTMLDivElement>(null);
  useToggleDropdown(dropdown);

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar__logo" alt="Pista" src={Logo} />
      </Link>
      <div className="navbar__links">{renderLinks(props)}</div>
      {renderDropdown(dropdown, props)}
    </nav>
  );
};
