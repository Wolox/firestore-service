# Firestore Service

[![FEArmy](./assets/FEA_open_source_sm.png)](https://github.com/orgs/Wolox/teams/front-end-army/members)

Create firestore queries as if you were using a REST api.

## Installation

```
npm install firestore-service
```

## Prerequisites

1 - Create a firestore data base, you can do it [here](https://console.firebase.google.com/)

2 - Get your database credentials. You can find those in
`Project Overview -> Add firebase to your web app`

Note: We strongly recommend you to save the credentials on a `.env` file and don't upload them to any repository.

## Getting Started

Once you have your credentials and the package install you can start using firestore service.

You will need to initialize the service as soon as you can, the code should look something like this:

```js
import firestoreService from 'firestore-service';

const firebaseConfig = {
  apiKey: xxxxxxxxxxxx,
  authDomain: xxxxxxxxxxxx,
  databaseURL: xxxxxxxxxxxx,
  projectId: xxxxxxxxxxxx,
  storageBucket: xxxxxxxxxxxx,
  messagingSenderId: xxxxxxxxxxxx
};

firestoreService.initialize(firebaseConfig);
```

## Response format

Every HTTP method will return a response with the following body.

```
{
  ok: a boolean -> true: Success, false: Failure
  data: The data you requested,
  status: An HTTP status code, see the code table below,
  statusText: 'OK' or 'Failure',
  request: the actual request (GET, POST, etc.)
}
```

## Supported methods

### GET

You can get all the elements from a collection or a specific element if the element's id is specified.

Note: The path will always be `collection/id/collection2/id2/...`. The "url" will finish with a collection if you want an array of elements or with an id if you want a single one.

E.g.:

```js
const response = await firestoreService.get('regions');
```

The response will have all the "regions"

```js
const response = await firestoreService.get('regions/32');
```

The response will have the information about the region with id 32.

#### Tools to make queries

Firestore service allows you to use certain tools to manipulate your data in the query. For this you should add a body into the request.

- Limit

The response will only have 20 "regions"

```js
const response = await firestoreService.get('regions/32', { limit: 20 });
```

- Filter

The response will only have users who are older than 22 years old and younger than 35

```js
const response = await firestoreService.get('regions/32', {
  filters: [
    { field: 'age', condition: '<', value: 35 },
    { field: 'age', condition: '>', value: 22 }
  ]
});
```

Supported condition operators:

- `<`
- `<=`
- `>`
- `>=`
- `==`
- `array_contains`

Note: If you want to combine `==` with any of the others you will have to create an index in your db. More info about this [here](https://firebase.google.com/docs/firestore/query-data/indexing)

- Order By

Allows for ordering the query result by database field and `ascending/descending` direction. The default `orderDirection` is `ascending`

The following query will get `regions` ordered by `age` `ascending`

```js
const response = await firestoreService.get('regions', { orderBy: 'age' });
```

The following query will get `regions` ordered by `age` `descending`

```js
const response = await firestoreService.get('regions', {
  orderBy: 'age',
  descending: true
});
```

The following query will get `regions` ordered by `age` and `name` `ascending`

```js
const response = await firestoreService.get('regions', {
  orderBy: ['age', 'name']
});
```

Note: If you want to order your query by several fields you will have to create an index in your db,More info about this here:
https://firebase.google.com/docs/firestore/query-data/indexing

### POST

You can create an element by calling POST with the collection's path and the body with the element's data.

E.g.:

```js
const body = {
  firstName: 'New name'
  lastName: 'New last name'
};

firestoreService.post('regions/32/users', body)
```

The previous request will create a new user under the region with id 32 using the information sent in the body. It will return the created user with its id.

### DELETE

You can delete a certain element from a collection by using DELETE with a path to the element.

E.g.:

```js
firestoreService.delete('regions/32/users/1');
```

The user from the region with id 32 that has id 1 will be deleted. The response will be empty

### PATCH

You can update an element by calling PATCH and providing only the fields desired to be updated from an element.

E.g.:

```js
const body = {
  firstName: 'New name2'
};

firestoreService.patch('regions/32/users/1', body);
```

The user with id 1 that belongs to the region with id 32 will have his name altered but will keep the previous values. The response will contain the updated user

### PUT

You can update an element by calling PUT and providing all the fields in an element, providing less fields will make the rest of the values `null` (except for the id). Providing a different id in the body will result in an error.

E.g.:

```js
const body = {
  id: 1,
  firstName: 'New name3',
  lastName: 'New last name3'
};

firestoreService.patch('regions/32/users/1', body);
```

The user with id 1 that belongs to the region with id 32 will be altered.The response will contain the edited user.

```js
const body = {
  firstName: 'New name3'
};

firestoreService.patch('regions/32/users/1', body);
```

The user with id 1 that belongs to the region with id 32 will be altered and the `lastName` field will be set to null. The response will contain the edited user.

```js
const body = {
  id: 2,
  firstName: 'New name3',
  lastName: 'New last name3'
};

firestoreService.patch('regions/32/users/1', body);
```

An error will be thrown because of id mismatch.

## Supported status codes

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

## Contributing

Learn how to contribute in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## About

This project is maintained by [Lucas Zibell](https://github.com/LucasZibell) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)
