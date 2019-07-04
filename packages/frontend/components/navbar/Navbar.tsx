import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Icon, Popover, Button } from 'antd';
import './Navbar.less';

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
      <Link href="/dashboard">
        <a onClick={hidePopover}>
          Dashboard <Icon type="dashboard" />
        </a>
      </Link>
      <Button onClick={handleLogout} type="danger">
        Logout <Icon type="disconnect" />
      </Button>
    </div>
  ) : (
    <div className="popover-container">
      <Link href="/login">
        <a onClick={hidePopover} className="nav-link">
          Log in <Icon type="key" />
        </a>
      </Link>
      <Link href="/signup">
        <a onClick={hidePopover} className="nav-link">
          Start Tracking <Icon type="user-add" />
        </a>
      </Link>
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
        <Link href="/login">
          <a className="nav-link">Log in</a>
        </Link>
        <Link href="/signup">
          <a className="nav-link">Start Tracking</a>
        </Link>
      </>
    );
  };

  return (
    <nav className="nav-bar">
      <div className="logo">
        <Link href="/">
          <img alt="pista-logo" src="/static/logo.svg" />
        </Link>
      </div>

      <div className="nav-links">{renderLinks()}</div>
    </nav>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.user
});

export const Navbar = connect(mapStateToProps)(UNavbar);
