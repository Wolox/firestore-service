/* eslint-disable no-undef */
import initializeMock from './Mock/initializeMock';
import { getMock, getCollectionMock } from './Mock/getMock';
import postMock from './Mock/postMock';
import deleteMock from './Mock/deleteMock';
import putMock from './Mock/putMock';
import authMock from './Mock/authMock';
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
  const response = await firestoreService.initialize(firebaseConfig);
  expect(response).toEqual(expect.objectContaining(initializeMock.success));
});

test('TEST: FAILURE INITIALIZE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.initialize();
  expect(response).toEqual(expect.objectContaining(initializeMock.failure));
});

test('TEST: GET - Get a specific id from a collection', async () => {
  const response = await firestoreService.get(getMock.success.path);
  expect(response).toEqual(getMock.success.response);
});

test('TEST: GET - Get an entire collection from a specific path', async () => {
  const response = await firestoreService.get(getCollectionMock.getAll.path);
  expect(response).toEqual(getCollectionMock.getAll.response);
});

test('TEST: GET WITH LIMIT 2 - Get only 2 elements from a collection', async () => {
  const response = await firestoreService.get(getCollectionMock.getOnlyTwo.path, getCollectionMock.getOnlyTwo.body);
  expect(response).toEqual(getCollectionMock.getOnlyTwo.response);
});

test('TEST: GET WITH LIMIT 3 - Get only 3 elements from a collection', async () => {
  const response = await firestoreService.get(getCollectionMock.getOnlyThree.path, getCollectionMock.getOnlyThree.body);
  expect(response).toEqual(getCollectionMock.getOnlyThree.response);
});

test('TEST: GET WITH ORDER BY DESCENDING - Get elements ordered by age, descending', async () => {
  const response = await firestoreService.get(getCollectionMock.getWithOrderByAgeDescending.path, getCollectionMock.getWithOrderByAgeDescending.body);
  expect(response).toEqual(getCollectionMock.getWithOrderByAgeDescending.response);
});

test('TEST: GET WITH ORDER BY DEFAULT ORDER DIRECTION - Get elements ordered by age, ascending by default', async () => {
  const response = await firestoreService.get(getCollectionMock.getWithOrderByAgeAscending.path, getCollectionMock.getWithOrderByAgeAscending.body);
  expect(response).toEqual(getCollectionMock.getWithOrderByAgeAscending.response);
});

test('TEST: FAILURE GET WITH LIMIT - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.get(getCollectionMock.wrongLimit.path, getCollectionMock.wrongLimit.body);
  expect(response).toEqual(expect.objectContaining(getCollectionMock.wrongLimit.response));
});

test('TEST: GET WITH FILTER - Get only users who are less than 32 years old', async () => {
  const response = await firestoreService.get(getCollectionMock.getWithFilters.path, getCollectionMock.getWithFilters.body);
  expect(response).toEqual(getCollectionMock.getWithFilters.response);
});

test('TEST: GET WITH MULTIPLE FILTERS - Get only users who are less than 32 years old and their name is May ', async () => {
  const response = await firestoreService.get(getCollectionMock.getWithMultipleFilters.path, getCollectionMock.getWithMultipleFilters.body);
  expect(response).toEqual(getCollectionMock.getWithMultipleFilters.response);
});

test('TEST: FAILURE WRONG FILTERS - Recieve a response with an error when the params are wrong ', async () => {
  const response = await firestoreService.get(getCollectionMock.wrongFilter.path, getCollectionMock.wrongFilter.body);
  expect(response).toEqual(expect.objectContaining(getCollectionMock.wrongFilter.response));
});

test('TEST: EMPTY GET BY ID - Recieve an empty response when element with id does not exist', async () => {
  const response = await firestoreService.get(getMock.wrongId.path);
  expect(response).toEqual(expect.objectContaining(getMock.wrongId.response));
});

test('TEST: WRONG PATH - Recieve an empty response when path does not exist', async () => {
  const response = await firestoreService.get(getMock.wrongPath.path);
  expect(response).toEqual(expect.objectContaining(getMock.wrongPath.response));
});

test('TEST: CREATE - Create a new document in a specific collection', async () => {
  const response = await firestoreService.post(postMock.success.path, postMock.success.body);
  const newUser = await firestoreService.get(`${postMock.success.path}/${response.data}`);
  expect(response).toEqual({
    data: newUser.data.id,
    ...postMock.success.response
  });
});

test('TEST: FAILURE CREATE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.post(postMock.failure.path, postMock.failure.body);
  expect(response).toEqual(expect.objectContaining(postMock.failure.response));
});

test('TEST: DELETE - Deletes a specific document in a collection', async () => {
  const response = await firestoreService.post(deleteMock.success.path);
  const deleteResponse = await firestoreService.delete(`${deleteMock.success.path}/${response.data}`);
  expect(deleteResponse).toEqual(deleteMock.success.response);
});

test('TEST: FAILURE DELETE - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.delete(deleteMock.failure.path);
  expect(response).toEqual(expect.objectContaining(deleteMock.failure.response));
});

test('TEST: PUT - Modifies a specific document in a collection', async () => {
  const response = await firestoreService.post(putMock.success.path, putMock.success.body);
  await firestoreService.put(`${putMock.success.path}/${response.data}`, putMock.success.newBody);
  const modified = await firestoreService.get(`${putMock.success.path}/${response.data}`);
  expect(modified).toEqual({
    data: { ...putMock.success.newBody, id: response.data },
    ...putMock.success.response
  });
});

test('TEST: PATCH - Modifies a specific docuemnt in a collection', async () => {
  const response = await firestoreService.post(putMock.success.path, putMock.success.body);
  await firestoreService.patch(`${putMock.success.path}/${response.data}`, putMock.success.newBody);
  const modified = await firestoreService.get(`${putMock.success.path}/${response.data}`);
  expect(modified).toEqual({
    data: { ...putMock.success.newBody, id: response.data },
    ...putMock.success.response
  });
});

test('TEST: FAILURE POST/PATCH - Recieve a response with an error when the params are wrong', async () => {
  const response = await firestoreService.post(putMock.failure.path, putMock.failure.body);
  const modifyResponse = await firestoreService.put(
    `${putMock.failure.path}/${response.data}`,
    putMock.failure.newBody
  );
  expect(modifyResponse).toEqual(expect.objectContaining(putMock.failure.response));
});

test('TEST: SIGNUP FAILURE - Recieve a response with an error when the credentials are wrong', async () => {
  const response = await firestoreService.signUp(authMock.signUp.email, authMock.signUp.password);
  expect(response).toEqual(expect.objectContaining(authMock.signUp.response));
});

test('TEST: LOGIN - Recieve an user info when the login is accomplished', async () => {
  const response = await firestoreService.login(authMock.login.success.email, authMock.login.success.password);
  expect(response).toEqual(expect.objectContaining(authMock.login.success.response));
});

test('TEST: LOGIN FAILURE - Recieve a response with an error when the credentials are wrong', async () => {
  const response = await firestoreService.login(authMock.login.failure.email, authMock.login.failure.password);
  expect(response).toEqual(expect.objectContaining(authMock.login.failure.response));
});

test('TEST: UPDATE PROFILE - Recieve a success when the information is correct', async () => {
  await firestoreService.login(authMock.login.success.email, authMock.login.success.password);
  const response = await firestoreService.updateProfile(authMock.update.body);
  expect(response).toEqual(expect.objectContaining(authMock.update.response));
});

test('TEST: UPDATE PROFILE FAILURE - Recieve a response with an error when the body is undefined', async () => {
  await firestoreService.login(authMock.login.success.email, authMock.login.success.password);
  const response = await firestoreService.updateProfile();
  expect(response).toEqual(expect.objectContaining(authMock.update.failureResponse));
});

