import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';

import config from './Config';
import { UserAgentApplication } from 'msal';
import { getUserDetails } from './GraphService';
import Calendar from './Calendar';
import Group from './Group';

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: config.appId
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    });

    var user = this.userAgentApplication.getAccount();

    this.state = {
      isAuthenticated: false,
      user: {},
      error: null
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });
      await this.getUserProfile();
    } catch (err) {
      var errParts = err.split('|');
      this.setState({
        isAuthenticated: false,
        user: {},
        error: { message: errParts[1], debug: errParts[0] }
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = (
        <ErrorMessage
          message={this.state.error.message}
          debug={this.state.error.debug}
        />
      );
    }

    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            authButtonMethod={
              this.state.isAuthenticated
                ? this.logout.bind(this)
                : this.login.bind(this)
            }
            user={this.state.user}
          />
          <Container>
            {error}
            <Route
              exact
              path='/'
              render={props => (
                <React.Fragment>
                  {this.state.user.isDISUser ? (
                    <h1>
                      <center>DIS User</center>
                    </h1>
                  ) : (
                    <h1>
                      <center>External User</center>
                    </h1>
                  )}
                  <Welcome
                    {...props}
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    rawUser={this.state.rawUser}
                    authButtonMethod={this.login.bind(this)}
                  />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path='/calendar'
              render={props => (
                <Calendar
                  {...props}
                  showError={this.setErrorMessage.bind(this)}
                />
              )}
            />
            <Route
              exact
              path='/group'
              render={props => (
                <Group
                  // {...props}
                  showError={this.setErrorMessage.bind(this)}
                />
              )}
            />
          </Container>
        </div>
      </Router>
    );
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await this.userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
        console.log('User:', user);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName,
            isDISUser:
              user.userPrincipalName.endsWith('@disdubai.ae') ||
              // user.userPrincipalName.endsWith('@parents.disdubai.ae') ||
              user.userPrincipalName.endsWith('@students.disdubai.ae')
          },
          rawUser: user,
          error: null
        });
      }
    } catch (err) {
      var error = {};
      if (typeof err === 'string') {
        var errParts = err.split('|');
        error =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  // async getUserProfile() {
  //   try {
  //     // Get the access token silently
  //     // If the cache contains a non-expired token, this function
  //     // will just return the cached token. Otherwise, it will
  //     // make a request to the Azure OAuth endpoint to get a token

  //     var accessToken = await this.userAgentApplication.acquireTokenSilent({
  //       scopes: config.scopes
  //     });

  //     if (accessToken) {
  //       // TEMPORARY: Display the token in the error flash
  //       this.setState({
  //         isAuthenticated: true,
  //         error: { message: 'Access token:', debug: accessToken.accessToken }
  //       });
  //     }
  //   } catch (err) {
  //     var errParts = err.split('|');
  //     this.setState({
  //       isAuthenticated: false,
  //       user: {},
  //       error: { message: errParts[1], debug: errParts[0] }
  //     });
  //   }
  // }

  setErrorMessage(message, debug) {
    this.setState({
      error: { message: message, debug: debug }
    });
  }
}

export default App;
