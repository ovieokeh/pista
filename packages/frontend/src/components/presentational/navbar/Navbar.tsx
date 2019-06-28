import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import { useToggleNav } from '../../../custom-hooks';
import Logo from '../../../assets/logo.svg';
import './Navbar.scss';

export const Navbar = () => {
  const navLinks = useRef<HTMLDivElement>(null);
  useToggleNav(navLinks);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink to="/">
          <img alt="pista-logo" src={Logo} />
        </NavLink>
      </div>

      <div className="hamburger">
        <Icon type="menu" />
      </div>

      <div ref={navLinks} className="nav-links">
        <NavLink to="/faq" className="nav-link">
          How it works
        </NavLink>
        <NavLink to="/contact-us" className="nav-link">
          Contact us
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Log in
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          Start Tracking
        </NavLink>
      </div>
    </nav>
  );
};
