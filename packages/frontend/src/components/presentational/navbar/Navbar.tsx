import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Popover, Button } from 'antd';
import Logo from '../../../assets/logo.svg';
import './Navbar.scss';

const handleLogout = () => {
  window.localStorage.clear();
  window.location.reload(true);
};

const UNavbar = (props: any) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const isAuth = props.user ? true : false;

  const hidePopover = () => setIsPopoverVisible(false);

  const popoverContent = isAuth ? (
    <div className="popover-container">
      <NavLink onClick={hidePopover} to="/dashboard">
        Dashboard <Icon type="dashboard" />
      </NavLink>
      <Button onClick={handleLogout} type="danger">
        Logout <Icon type="disconnect" />
      </Button>
    </div>
  ) : (
    <div className="popover-container">
      <NavLink onClick={hidePopover} to="/login" className="nav-link">
        Log in <Icon type="key" />
      </NavLink>
      <NavLink onClick={hidePopover} to="/signup" className="nav-link">
        Start Tracking <Icon type="user-add" />
      </NavLink>
    </div>
  );

  const handlePopoverVisibility = (visible: boolean) => {
    setIsPopoverVisible(visible);
  };

  const renderLinks = () => {
    return isAuth ? (
      <Popover
        placement="topLeft"
        content={popoverContent}
        visible={isPopoverVisible}
        onVisibleChange={handlePopoverVisibility}
        trigger="click"
      >
        <Button>
          <Icon type="user" />
        </Button>
      </Popover>
    ) : (
      <>
        <NavLink to="/login" className="nav-link">
          Log in
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          Start Tracking
        </NavLink>
      </>
    );
  };

  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink to="/">
          <img alt="pista-logo" src={Logo} />
        </NavLink>
      </div>

      <div className="nav-links">{renderLinks()}</div>
    </nav>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.user
});

export const Navbar = connect(mapStateToProps)(UNavbar);
