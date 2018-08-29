export default {
  success: {
    path: 'tests/create/animals',
    body: { name: 'Bob the test Bear', specimen: 'Bear' },
    response: {
      ok: true,
      request: 'CREATE',
      status: 201,
      statusText: 'OK'
    }
  },
  failure: {
    path: 'tests/create/animals/home/thisIsWrong',
    body: undefined,
    response: {
      ok: false,
      request: 'CREATE',
      status: 400,
      statusText: 'Failure'
    }
  }
};
