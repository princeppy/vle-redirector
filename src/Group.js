import React from 'react';
import { Table } from 'reactstrap';
// import moment from 'moment';
import config from './Config';
import { getGroups } from './GraphService';

// Helper function to format Graph date/time

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
  }

  async componentDidMount() {
    try {
      // Get the user's access token
      var accessToken = await window.msal.acquireTokenSilent({
        scopes: config.scopes
      });

      // Get the user's events
      var groups = await getGroups(accessToken);

      // Update the array of events in state
      this.setState({ groups: groups });
    } catch (err) {
      this.props.showError('ERROR', JSON.stringify(err));
    }
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        <pre>{JSON.stringify(this.state.groups, null, 4)}</pre>
        {/* <Table>
          <thead>
            <tr>
              <th scope='col'>Display Name</th>
              <th scope='col'>Mail</th>
              <th scope='col'>SecurityEnabled</th>
            </tr>
          </thead>
          <tbody>
            {this.state.groups.map(function(group) {
              return (
                <tr key={group.id}>
                  <td>{group.displayName}</td>
                  <td>{group.mail}</td>
                  <td>{group.securityEnabled}</td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </div>
    );
  }
}
