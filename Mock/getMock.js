export const getMock = {
  success: {
    path: 'tests/get/users/J8NR45UzDffyMY0wBNoa',
    response: {
      data: { age: 33, firstName: 'Mike', id: 'J8NR45UzDffyMY0wBNoa', lastName: 'Poe' },
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  wrongId: {
    path: 'tests/get/users/wrongId',
    response: {
      data: {
        id: 'wrongId'
      },
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  wrongPath: {
    path: 'tests/get/wrongPath',
    response: {
      data: [],
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  }
};

export const getCollectionMock = {
  getAll: {
    path: 'tests/get/users',
    response: {
      data: [
        {
          age: 25,
          firstName: 'Kyle',
          id: '7QhqXVN0bQ3Zd6cKP1br',
          lastName: 'July'
        },
        {
          age: 22,
          firstName: 'Matt',
          id: 'EFUsC6gMx052i39GFz8a',
          lastName: 'Myers'
        },
        {
          age: 33,
          firstName: 'Mike',
          id: 'J8NR45UzDffyMY0wBNoa',
          lastName: 'Poe'
        },
        {
          age: 20,
          firstName: 'May',
          id: 'q5LpatgtZwj2U2OalZKR',
          lastName: 'June'
        }
      ],
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  getOnlyTwo: {
    path: 'tests/get/users',
    body: { limit: 2 },
    response: {
      data: [
        {
          age: 25,
          firstName: 'Kyle',
          id: '7QhqXVN0bQ3Zd6cKP1br',
          lastName: 'July'
        },
        {
          age: 22,
          firstName: 'Matt',
          id: 'EFUsC6gMx052i39GFz8a',
          lastName: 'Myers'
        }
      ],
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  },
  getOnlyThree: {
    path: 'tests/get/users',
    body: { limit: 3 },
    response: {
      data: [
        {
          age: 25,
          firstName: 'Kyle',
          id: '7QhqXVN0bQ3Zd6cKP1br',
          lastName: 'July'
        },
        {
          age: 22,
          firstName: 'Matt',
          id: 'EFUsC6gMx052i39GFz8a',
          lastName: 'Myers'
        },
        {
          age: 33,
          firstName: 'Mike',
          id: 'J8NR45UzDffyMY0wBNoa',
          lastName: 'Poe'
        }
      ],
      ok: true,
      request: 'GET',
      status: 200,
      statusText: 'OK'
    }
  }
};
