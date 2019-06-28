import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

class Scroll extends Component<RouteComponentProps> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter(Scroll);
