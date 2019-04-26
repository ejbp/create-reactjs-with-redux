import React from 'react';
import { Route } from 'react-router';

class RouteWithProps extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getRender = this.getRender.bind(this);
  }

  getRender() {
    const { component: Component, path, exact, requires, ...rest } = this.props;
    return <Component {...rest} />;
  }

  render() {
    const { path, exact } = this.props;
    return (
      <Route
        exact={exact}
        path={path}
        render={this.getRender}
      />
    );
  }
}

export default RouteWithProps;
