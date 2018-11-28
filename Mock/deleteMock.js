export default {
  success: {
    path: 'tests/create/animals',
    response: {
      ok: true,
      request: 'DELETE',
      status: 200,
      statusText: 'OK'
    }
  },
  failure: {
    path: 'tests/failure/delete/request/wrong',
    response: {
      ok: false,
      request: 'DELETE',
      status: 400,
      statusText: 'Failure'
    }
  }
};
