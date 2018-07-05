import firestoreService from './index';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firestoreService.INITIALIZE(firebaseConfig);

test('get user w7YD8WslxITuRjOa8HCl', async () => {
  const path = 'users?id=w7YD8WslxITuRjOa8HCl';
  const response = await firestoreService.GET(path);
  expect(response).toEqual({
    data: { dni: 39568741, firstName: 'Juan', id: 'w7YD8WslxITuRjOa8HCl', lastName: 'Perez' },
    request: 'GET',
    status: 200,
    statusText: 'OK'
  });
});

test('Get Users', async () => {
  const path = 'users';
  const response = await firestoreService.GET(path);
  expect(response).toEqual({
    data: [
      {
        dni: 39852456,
        firstName: 'Tomas',
        id: 'eT35RtaGC3OOKvfzxDjs',
        lastName: 'Moreno'
      },
      {
        dni: 38741963,
        firstName: 'Ignacio',
        id: 'jApqztuVxy1SmF8Os02W',
        lastName: 'Molina'
      },
      {
        dni: 39568741,
        firstName: 'Juan',
        id: 'w7YD8WslxITuRjOa8HCl',
        lastName: 'Perez'
      }
    ],
    request: 'GET',
    status: 200,
    statusText: 'OK'
  });
});

// test('Create User', async () => {
//   const path = 'users';
//   const body = { firstName: 'Test', lastName: 'Delete', dni: '22' };
//   const response = await firestoreService.CREATE(path, body);
//   const newUser = await firestoreService.GET(`path?id=${response.data}`);
//   await firestoreService.DELETE(`path?id=${response.data}`);
//   expect(response).toEqual({
//     data: newUser.data.id,
//     request: 'CREATE',
//     status: 201,
//     statusText: 'OK'
//   });
// });

// test('Delete User', async () => {
//   const path = 'users';
//   const body = { firstName: 'Test', lastName: 'Delete', dni: '22' };
//   await firestoreService.CREATE(path, body);
//   const response = await firestoreService.DELETE(`path?id=${response.data}`);
//   expect(response).toEqual({
//     data: unde,
//     request: 'CREATE',
//     status: 201,
//     statusText: 'OK'
//   });
// });
