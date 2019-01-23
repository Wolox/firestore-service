import url from 'url';

import firebase from 'firebase';

import { getPathAndElementId } from './Utils/collectionUtils';
import { queryForID, queryForCollection } from './Utils/queryUtils';
import { STATUS, SUCCESS_CODES, CLIENT_ERROR_CODES, REQUEST } from './constants';

let firestore = null;
let userAdmin = null;

// eslint-disable-next-line max-params
const generateResponse = (ok, data, status, statusText, request) => ({
  ok,
  data,
  status,
  statusText,
  request
});

function initializeFirestore(keys) {
  try {
    firestore = firebase.initializeApp(keys).firestore();
    userAdmin = firebase.initializeApp(keys, 'userAdmin');
    firestore.settings({ timestampsInSnapshots: true });
    return generateResponse(true, firestore, SUCCESS_CODES.OK, STATUS.OK, REQUEST.INITIALIZE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.INITIALIZE);
  }
}

async function getData({ pathname }, body = {}) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    let data = firestore.collection(path);
    data = await (id ? queryForID(data, id) : queryForCollection(data, body));
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.GET);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.GET);
  }
}

async function createDoc({ pathname }, body) {
  try {
    const { path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .add(body)
      .then(ref => ref.id);
    return generateResponse(true, data, SUCCESS_CODES.CREATED, STATUS.OK, REQUEST.POST);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.POST);
  }
}

async function modifyDoc({ pathname }, body) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .doc(id)
      .set(body);
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.PUT);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.PUT);
  }
}

async function deleteDoc({ pathname }) {
  try {
    const { id, path } = getPathAndElementId(pathname);
    const data = await firestore
      .collection(path)
      .doc(id)
      .delete();
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.DELETE);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.BAD_REQUEST, STATUS.FAILURE, REQUEST.DELETE);
  }
}

async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const data = await firebase.auth().currentUser;
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.LOGIN);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.UNAUTHORIZED, STATUS.FAILURE, REQUEST.LOGIN);
  }
}

async function signUp(email, password) {
  try {
    await userAdmin.auth().createUserWithEmailAndPassword(email, password);
    const data = await userAdmin.auth().currentUser;
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.SIGN_UP);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.FORBIDDEN, STATUS.FAILURE, REQUEST.SIGN_UP);
  }
}

async function updateProfile(body) {
  try {
    const user = firebase.auth().currentUser;
    const data = await user.updateProfile(body);
    return generateResponse(true, data, SUCCESS_CODES.OK, STATUS.OK, REQUEST.SIGN_UP);
  } catch (error) {
    return generateResponse(false, error, CLIENT_ERROR_CODES.FORBIDDEN, STATUS.FAILURE, REQUEST.SIGN_UP);
  }
}

const firestoreService = {
  initialize: keys => initializeFirestore(keys),
  get: (path, body) => getData(url.parse(path, true), body),
  put: (path, body) => modifyDoc(url.parse(path, true), body),
  delete: path => deleteDoc(url.parse(path, true)),
  post: (path, body) => createDoc(url.parse(path, true), body),
  patch: (path, body) => modifyDoc(url.parse(path, true), body),
  login: (email, password) => login(email, password),
  signUp: (email, password) => signUp(email, password),
  updateProfile: body => updateProfile(body)
};

export default firestoreService;
