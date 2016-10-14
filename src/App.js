import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Redirect } from 'react-router';

import './App.css';

let isAuthenticated = false;

let MatchAuth = ({ component: Component, ...rest }) => {
  return (
    <Match {...rest} render={(props) => {
      if (!isAuthenticated) {
        return (
          <Redirect to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }} />
        );
      }

      return <Component {...props} />;
    }} />
  );
};

MatchAuth = connect()(MatchAuth);

const Details = ({ params }) => {
  return (
    <p>Details {params.fooId}</p>
  );
};

const List = () => {
  return (
    <div>
      <p>List Route</p>
      <Match pattern="/foo/:1234" component={Details} />
    </div>
  );
};

const SignIn = React.createClass({
  getInitialState () {
    return {
      redirect: false
    };
  },

  handleSubmit (event) {
    event.preventDefault();

    isAuthenticated = true;

    this.setState({
      redirect: true
    });
  },

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.props.location.state.from || '/foo'} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Sign In</button>
      </form>
    );
  }
});

const Missed = () => {
  return <p>Miss!</p>
};

const App = () => {
  return (
    <div className="App">
      <MatchAuth pattern="/foo" component={List} />
      <Match pattern="/sign-in" component={SignIn} />
      <Miss component={Missed} />
    </div>
  );
}

export default App;
