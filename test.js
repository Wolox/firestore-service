import initializeMock from './Mock/initializeMock';
import { getMock, getCollectionMock } from './Mock/getMock';
import postMock from './Mock/postMock';
import deleteMock from './Mock/deleteMock';
import putMock from './Mock/putMock';
import firestoreService from './firestore-service';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

test('TEST: INITIALIZE - Initialize Firestore Service', async () => {
  const response = await firestoreService.INITIALIZE(firebaseConfig);
  expect(response).toEqual(expect.objectContaining(initializeMock.success));
});

test('TEST: FAILURE INITIALIZE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.INITIALIZE();
  expect(response).toEqual(expect.objectContaining(initializeMock.failure));
});

test('TEST: GET - Get a specific id from a collection', async () => {
  const response = await firestoreService.GET(getMock.success.path);
  expect(response).toEqual(getMock.success.response);
});

test('TEST: GET - Get an entire collection from a specific path', async () => {
  const response = await firestoreService.GET(getCollectionMock.getAll.path);
  expect(response).toEqual(getCollectionMock.getAll.response);
});

test('TEST: GET WITH LIMIT 2 - Get only 2 elements from a collection', async () => {
  const response = await firestoreService.GET(getCollectionMock.getOnlyTwo.path, getCollectionMock.getOnlyTwo.body);
  expect(response).toEqual(getCollectionMock.getOnlyTwo.response);
});

test('TEST: GET WITH LIMIT 3 - Get only 3 elements from a collection', async () => {
  const response = await firestoreService.GET(getCollectionMock.getOnlyThree.path, getCollectionMock.getOnlyThree.body);
  expect(response).toEqual(getCollectionMock.getOnlyThree.response);
});

test('TEST: EMPTY GET BY ID - Recieve an empty response when element with id does not exist', async () => {
  const response = await firestoreService.GET(getMock.wrongId.path);
  expect(response).toEqual(expect.objectContaining(getMock.wrongId.response));
});

test('TEST: WRONG PATH - Recieve an empty response when path does not exist', async () => {
  const response = await firestoreService.GET(getMock.wrongPath.path);
  expect(response).toEqual(expect.objectContaining(getMock.wrongPath.response));
});

test('TEST: CREATE - Create a new document in a specific collection', async () => {
  const response = await firestoreService.POST(postMock.success.path, postMock.success.body);
  const newUser = await firestoreService.GET(`${postMock.success.path}/${response.data}`);
  expect(response).toEqual({
    data: newUser.data.id,
    ...postMock.success.response
  });
});

test('TEST: FAILURE CREATE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.POST(postMock.failure.path, postMock.failure.body);
  expect(response).toEqual(expect.objectContaining(postMock.failure.response));
});

test('TEST: DELETE - Deletes a specific document in a collection', async () => {
  const response = await firestoreService.POST(deleteMock.success.path);
  const deleteResponse = await firestoreService.DELETE(`${deleteMock.success.path}/${response.data}`);
  expect(deleteResponse).toEqual(deleteMock.success.response);
});

test('TEST: FAILURE DELETE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.DELETE(deleteMock.failure.path);
  expect(response).toEqual(expect.objectContaining(deleteMock.failure.response));
});

test('TEST: PUT - Modifies a specific document in a collection', async () => {
  const response = await firestoreService.POST(putMock.success.path, putMock.success.body);
  await firestoreService.PUT(`${putMock.success.path}/${response.data}`, putMock.success.newBody);
  const modified = await firestoreService.GET(`${putMock.success.path}/${response.data}`);
  expect(modified).toEqual({
    data: { ...putMock.success.newBody, id: response.data },
    ...putMock.success.response
  });
});

test('TEST: PATCH - Modifies a specific docuemnt in a collection', async () => {
  const response = await firestoreService.POST(putMock.success.path, putMock.success.body);
  await firestoreService.PATCH(`${putMock.success.path}/${response.data}`, putMock.success.newBody);
  const modified = await firestoreService.GET(`${putMock.success.path}/${response.data}`);
  expect(modified).toEqual({
    data: { ...putMock.success.newBody, id: response.data },
    ...putMock.success.response
  });
});

test('TEST: FAILURE POST/PATCH - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.POST(putMock.failure.path, putMock.failure.body);
  const modifyResponse = await firestoreService.PUT(
    `${putMock.failure.path}/${response.data}`,
    putMock.failure.newBody
  );
  expect(modifyResponse).toEqual(expect.objectContaining(putMock.failure.response));
});
