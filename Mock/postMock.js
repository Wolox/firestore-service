export default {
  success: {
    path: 'tests/create/animals',
    body: { name: 'Bob the test Bear', specimen: 'Bear' },
    response: {
      ok: true,
      request: 'POST',
      status: 201,
      statusText: 'OK'
    }
  },
  failure: {
    path: 'tests/create/animals/home/thisIsWrong',
    body: undefined,
    response: {
      ok: false,
      request: 'POST',
      status: 400,
      statusText: 'Failure'
    }
  }
};
