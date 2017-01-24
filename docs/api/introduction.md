# Introduction

## Installation
The first thing is to clone the [Misofome repo](https://github.com/RijkvanZanten/misofome)

```bash
$ git clone https://github.com/RijkvanZanten/misofome.git
```

Install the node_modules with
```bash
$ npm install
```

The API can be started by starting in production mode with
```bash
$ npm start
```

You could also start the app in development mode (with autoreloading) with
```bash
$ npm run dev
```

If you want to develop just the api, run the above commands in the api directory. This way, the app will skip launching the webpack building of the frontend, which saves on building time when editing the API.

## Authentication
Most routes require you to authenticate by providing an access-token as `x-access-token` HTTP header.

See the `/user/` endpoints section of this documentation on how to receive this authentication token.

Example request to /collection/cards
```bash
$ curl -H "x-access-token: eyJhbG..." http://localhost:3000/api/collection/cards/
```

```js
request
  .get('http://localhost:3000/api/collection/cards/')
  .set('x-access-token', 'eyJhbG...')
  .send();
```

## Schemas
The api endpoints work independently from the data model. You can modify the collection schemes (in `/api/models`) without having to worry about the functionality of the api endpoints. The schemas themselves are Mongoose schemas. Checkout [the official Mongoose docs](http://mongoosejs.com/docs/guide.html) for more info on schemas.

You can add as many fields and schemas as you want. The only required schema/fields combo is the user schema with a username and password field (which is used for authentication). We've decided to place this schema in the same directory, to make it easy to add fields to the user model, without having to create an extra model just for user metadata.
