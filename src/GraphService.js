var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: done => {
      done(null, accessToken.accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  return user;
}

export async function getEvents(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const events = await client
    .api('/me/events')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get();

  console.log('events:', events);

  return events;
}

export async function getGroups(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const groups = await client
    .api('/me/memberOf')
    .select('id,displayName,mail,securityEnabled')
    .get();

  console.log(
    'groups:',
    groups.value.filter(function(f) {
      return f.displayName.startsWith('Year ');
    })
  );

  return {
    groups: groups.value.filter(function(f) {
      return f.displayName.startsWith('Year 0');
    }),
    isStaff:
      groups.value.filter(function(f) {
        return (
          f.displayName.startsWith('AA-STAFF') ||
          f.displayName.startsWith('AA-Teachers')
        );
      }).length >= 1,
    year01:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 01');
      }).length >= 1,
    year02:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 02');
      }).length >= 1,
    year03:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 03');
      }).length >= 1,
    year04:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 04');
      }).length >= 1,
    year05:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 05');
      }).length >= 1,
    year06:
      groups.value.filter(function(f) {
        return f.displayName.startsWith('Year 06');
      }).length >= 1
  };
}
