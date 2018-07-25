# Firestore Service

Create simple firestore queries using http request.

## Installing

First you need to install the package.

```
npm install firestore-service
```

### Prerequisites

You will need to create a firestore data base. You can do it right here https://console.firebase.google.com/

Afterwards you will need to get the credentials for your db. You can get those on 
`Project Overview -> Add firebase to your web app`

Note: We strongly recommend to save the credentials on a .env file and not upload them to any repository. With these credentials anyone can access your cloud db.

### Getting Started

Once you have your credentials and the package install you can start using firestore service.

You will need to initialize the service as soon as you can.

```
import firestoreService from 'firestore-service'

const firebaseConfig = {
  apiKey: xxxxxxxxxxxx,
  authDomain: xxxxxxxxxxxx,
  databaseURL: xxxxxxxxxxxx,
  projectId: xxxxxxxxxxxx,
  storageBucket: xxxxxxxxxxxx,
  messagingSenderId: xxxxxxxxxxxx
};

firestoreService.INITIALIZE(firebaseConfig);

```

## HTTP Methods

For all the examples we will be using the following database.

### RESPONSE

All the http methods will return a response with the following body.

```
{
  ok: a boolean -> true: Success, false: Failure
  data: The data you requested,
  status: An http Code see the code table below,
  statusText: 'OK' or 'Failure',
  request: the actual request (GET, POST, etc.)
}
```

### GET

You can get all the elements from a collection by using get with the path towards the collection.

Note: Have in mind that the path will be 'collection/id/collection2/id2/.../collection'
It will always finish with a collection.

```
const path = 'regions'

const response = await firestoreService.GET(path);
```

In the response there will be all the regions

```
const path = 'regions?id=NA'

const response = await firestoreService.GET(path);
```

In the response there will be all the attributes of the NA document.


### POST

You can update an element by calling POST with the path towards the collection, the id of the item to update and the body.

```
const path = 'regions/NA/users?id=123'

const body = {
  name: 'New Name'
  surname: 'New Surname'
};

firestoreService.POST(path, body)
```

### DELETE

You can delete a certain item from a collection by using DELETE with a path and an id as queryparam.

```
const path = 'regions/NA/users?id=123'

firestoreService.DELETE(path)
```

The user from the NA region with the id 123 will be deleted.


### CREATE

You can create a new element on a collection by using CREATE and the path towards the desire collection.

```
const path = 'regions/LAS/users'

const response = await firestoreService.CREATE(path)
```

In the response there will be the id to the created document.

### PATCH

You can update an element by calling POST with the path towards the collection, the id of the item to update and the body.

```
const path = 'regions/NA/users?id=123'

const body = {
  name: 'New Name'
  surname: 'New Surname'
};

firestoreService.PATCH(path, body)
```

### Status Codes

```
OK: 200
CREATED: 201
NO_CONTENT: 204
BAD_REQUEST: 400
UNAUTHORIZED: 401
FORBIDDEN: 403
NOT_FOUND: 404
CONFLICT: 409
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
