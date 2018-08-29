export default {
  success: {
    path: 'tests/create/animals',
    body: { specimen: 'unkown', name: 'None' },
    newBody: { specimen: 'Shark', name: 'Little Shark' },
    response: {
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  failure: {
    path: 'tests/create/animals',
    body: { specimen: 'unkown', name: 'None' },
    newBody: undefined,
    response: {
      ok: false,
      request: 'POST',
      status: 400,
      statusText: 'Failure'
    }
  }
};
