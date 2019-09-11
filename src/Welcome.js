import React from 'react';
import { Button, Jumbotron } from 'reactstrap';
import config from './Config';
import { getGroups } from './GraphService';

function WelcomeContent(props) {
  var groups = props.groups;
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div style={{ alignContent: 'center' }}>
        <h4>Welcome {props.user.displayName}!</h4>
        {props.groups !== undefined ? (
          <div>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year01)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle01&LoginOptions=1" type="submit">
              Year 01
         </Button>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year02)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle02&LoginOptions=1" type="submit">
              Year 02
         </Button>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year03)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle03&LoginOptions=1" type="submit">
              Year 03
         </Button>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year04)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle04&LoginOptions=1" type="submit">
              Year 04
         </Button>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year05)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle05&LoginOptions=1" type="submit">
              Year 05
         </Button>
            <Button variant="primary" disabled={!(props.groups.isStaff || props.groups.year06)} style={{ margin: "5px" }} href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=disdubai.ae&wreply=https://disdubai.sharepoint.com/sites/vle06&LoginOptions=1" type="submit">
              Year 06
         </Button>

          </div>
        ) : (<div></div>)}

        {/* <p>Use the navigation bar at the top of the page to get started.</p> */}
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return (
    <div>
      <Button color='primary' onClick={props.authButtonMethod}>
        Click here to sign in
    </Button>
    </div>
  );
}

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Primary VLE</h1>
          {/* <p className='lead'>
          This sample app shows how to use the Microsoft Graph API to access
          Outlook and OneDrive data from React
        </p> */}
          <WelcomeContent
            isAuthenticated={this.props.isAuthenticated}
            user={this.props.user}
            authButtonMethod={this.props.authButtonMethod}
            groups={this.props.groups}
          />
          {/* <pre>{JSON.stringify(this.props.rawUser, null, 4)}</pre> */}
        </Jumbotron>

        <Jumbotron>
          <h1>Secondary VLE</h1>
          <h4>Microsoft Teams Coming Soon</h4>
        </Jumbotron>
      </div>);
  }
}
