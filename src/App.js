import React, { Component } from 'react';
// import ErrorMessage from './ErrorMessage';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import config from './Config';
import { UserAgentApplication } from 'msal';
import { getUserDetails } from './GraphService';
import { getGroups } from './GraphService';

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: config.appId,
        // redirectUri: 'https://vle.disdubai.ae',
        redirectUri: 'http://localhost:3000/',
        // postLogoutRedirectUri: 'https://vle.disdubai.ae',
        postLogoutRedirectUri: 'http://localhost:3000/',
        authority:
          'https://login.microsoftonline.com/8b652d2a-eb2e-4624-8fb8-2418d14113d7/'
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
      error: null,
      groups: {}
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
      this.state.isAuthenticated = true;
    }
  }

  // async componentDidMount() {
  //   if (this.state.isAuthenticated) {
  //     try {
  //       // Get the user's access token
  //       var accessToken = await window.msal.acquireTokenSilent({
  //         scopes: config.scopes
  //       });

  //       // Get the user's events
  //       var groups = await getGroups(accessToken);

  //       // Update the array of events in state
  //       this.setState({ groups: groups });
  //     } catch (err) {}
  //   }
  // }

  async login() {
    // alert('async login()');

    try {
      // await this.userAgentApplication.loginRedirect({
      await this.userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
        // prompt: 'login'
      });

      await this.getUserProfile();
    } catch (err) {
      console.log(err);
      // var errParts = err.split('|');
      this.setState({
        isAuthenticated: false,
        user: {}
        // error: { message: errParts[1], debug: errParts[0] }
      });
    }

    this.setState({
      isAuthenticated: true
    });

    try {
      // Get the user's access token
      var accessToken = await window.msal.acquireTokenSilent({
        scopes: config.scopes
      });

      // Get the user's events
      var groups = await getGroups(accessToken);

      // Update the array of events in state
      this.setState({ groups: groups });
    } catch (err) {}
  }

  logout() {
    this.userAgentApplication.logout();
  }

  render() {
    // let error = null;
    // if (this.state.error) {
    //   error = (
    //     <ErrorMessage
    //       message={this.state.error.message}
    //       debug={this.state.error.debug}
    //     />
    //   );
    // }

    return (
      <div className='vle-redirector'>
        {/* <pre>{JSON.stringify(this.state.isAuthenticated, null, 4)}</pre> */}
        {/* <pre>{JSON.stringify(this.state.user, null, 4)}</pre> */}
        <div className='container-fluid container-height mr-2'>
          <h1>Deira International School</h1>
          <div className='row'>
            <div className='col-lg-3 col-sm-1'></div>
            <div className='col-lg-6 col-sm-10'>
              <div className='vle-redirector-card card'>
                <div className='vle-redirector-card card-header'>
                  <h4>Virtual Learning Environment (VLE) - Primary</h4>
                </div>
                <div className='vle-redirector-card card-body'>
                  {!this.state.isAuthenticated ? (
                    <div className='info-mg-top'>
                      {/* <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wtrealm=urn%3asharepoint%3avle&wreply=https://vle.disdubai.ae&LoginOptions=1'>
                        <button
                          className='btn btn-primary btn-mg-top'
                          type='submit'
                        >
                          {'  -   '}
                          Login{'  -   '}
                        </button>
                      </a> */}
                      {/* <a href='https://fs.disdubai.ae/adfs/ls?wa=wsignin1.0&wtrealm=urn%3asharepoint%3avle&wctx='> Login </a> */}
                      <button
                        className='btn btn-primary btn-mg-top'
                        type='submit'
                        onClick={this.login.bind(this)}
                      >
                        {' '}
                        Login{' '}
                      </button>
                    </div>
                  ) : (
                    <React.Fragment>
                      {!!this.state.user.isDISUser &&
                        !!this.state.user.userPrincipalName && (
                          <div className='info-mg-top'>
                            Welcome {this.state.user.displayName}, you have
                            logined as '{this.state.user.userPrincipalName}' (
                            {this.state.user.yearGroup})
                          </div>
                        )}
                      {!this.state.user.isDISUser &&
                        !!this.state.user.userPrincipalName && (
                          <div className='info-mg-top'>
                            Welcome {this.state.user.displayName}, you have
                            logined as External User '
                            {this.state.user.userPrincipalName}'
                          </div>
                        )}
                    </React.Fragment>
                  )}

                  {this.state.isAuthenticated &&
                    !!this.state.user.userPrincipalName && (
                      <div className='info-mg-top'>
                        {(this.state.groups.isStaff ||
                          this.state.groups.year01) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle01&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 01
                            </button>
                          </a>
                        )}
                        {(this.state.groups.isStaff ||
                          this.state.groups.year02) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle02&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 02
                            </button>
                          </a>
                        )}
                        {(this.state.groups.isStaff ||
                          this.state.groups.year03) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle03&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 03
                            </button>
                          </a>
                        )}
                        {(this.state.groups.isStaff ||
                          this.state.groups.year04) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle04&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 04
                            </button>
                          </a>
                        )}
                        {(this.state.groups.isStaff ||
                          this.state.groups.year05) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle05&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 05
                            </button>
                          </a>
                        )}
                        {(this.state.groups.isStaff ||
                          this.state.groups.year06) && (
                          <a href='https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle06&LoginOptions=1'>
                            <button
                              className='btn btn-primary btn-mg-top'
                              type='submit'
                            >
                              Year 06
                            </button>
                          </a>
                        )}
                      </div>
                    )}
                  {this.state.isAuthenticated &&
                    !!this.state.user.userPrincipalName && (
                      <div className='info-mg-top'>
                        {/* <a href="https://login.windows.net/common/oauth2/logout?post_logout_redirect_uri=https://vle.disdubai.ae"><button className="btn btn-primary btn-mg-top" type="submit" id="deplCenter">Logout 0</button></a> */}
                        {/* <a href='https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=https://vle.disdubai.ae'> */}
                        <button
                          className='btn btn-primary btn-mg-top'
                          type='submit'
                          onClick={this.logout.bind(this)}
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;MSAL
                          Logout&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                      </div>
                    )}

                  <div className='info-mg-top'>
                    <button
                      className='btn btn-primary'
                      type='button'
                      data-toggle='collapse'
                      data-target='#collapseExample'
                      aria-expanded='false'
                      aria-controls='collapseExample'
                      style={{ margin: '5px' }}
                    >
                      VLE Help Documents
                    </button>

                    <button
                      className='btn btn-primary'
                      type='button'
                      data-toggle='collapse'
                      data-target='#collapseCurriculum'
                      aria-expanded='false'
                      aria-controls='collapseCurriculum'
                      style={{ margin: '5px' }}
                    >
                      Curriculum Documents
                    </button>
                  </div>
                </div>
                <div
                  className='collapse'
                  id='collapseExample'
                  style={{ width: '100%' }}
                >
                  <div
                    className='card card-body'
                    style={{ marginTop: '20px', textAlign: 'left' }}
                  >
                    <ul>
                      <li>
                        <a
                          href='https://cdn.disdubai.ae/vle/How%20to%20login%20to%20VLE.pdf'
                          target='_blank'
                        >
                          How to Login to VLE
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://cdn.disdubai.ae/vle/Possible%20VLE%20Errors.pdf'
                          target='_blank'
                        >
                          Possible VLE Errors
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className='collapse'
                  id='collapseCurriculum'
                  style={{ width: '100%' }}
                >
                  <div
                    className='card card-body'
                    style={{ marginTop: '20px', textAlign: 'left' }}
                  >
                    <ul>
                      <li>
                        <a
                          href='https://cdn.disdubai.ae/vle/DIS%20Calculations%20Policy%202019%20-%202020%20Stages%20EY%201-6%20New.pdf'
                          target='_blank'
                        >
                          Calculation Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className='row'>
            <div className='col-lg-3 col-sm-1'></div>
            <div className='col-lg-6 col-sm-10'>
              <div className='vle-redirector-card card'>
                <div className='vle-redirector-card card-header'>
                  <h4>CCA - SOCS</h4>
                </div>
                <div className='vle-redirector-card card-body'>
                  <div className='info-mg-top'>
                    <a href='https://www.socscms.com/login/28056/pupil'>
                      <button
                        className='btn btn-primary btn-mg-top'
                        type='submit'
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                    </a>
                    <button
                      className='btn btn-primary btn-mg-top'
                      type='submit'
                      onClick={this.logout.bind(this)}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-lg-3 col-sm-1'></div>
            <div className='col-lg-6 col-sm-10'>
              <div className='vle-redirector-card card'>
                <div className='vle-redirector-card card-header'>
                  <h4>Virtual Learning Environment (VLE) - Secondary</h4>
                </div>
                <div className='vle-redirector-card card-body'>
                  Microsoft Teams - Coming Soon!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        let st = {
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            userPrincipalName: user.userPrincipalName,
            email: user.mail || user.userPrincipalName,
            yearGroup: user.officeLocation,
            isDISUser:
              user.userPrincipalName.endsWith('@disdubai.ae') ||
              // user.userPrincipalName.endsWith('@parents.disdubai.ae') ||
              user.userPrincipalName.endsWith('@students.disdubai.ae')
          },
          rawUser: user,
          error: null
        };
        this.setState({ ...st });

        if (!!st.user.isDISUser) {
          var groups = await getGroups(accessToken);
          this.setState({
            groups: groups
          });
        }
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

  setErrorMessage(message, debug) {
    this.setState({
      error: { message: message, debug: debug }
    });
  }
}

export default App;
