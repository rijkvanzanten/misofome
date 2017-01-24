# Misofome API Reference

This documentation is intended to get you up and running with the current version of the Misofome API. We’ll cover everything you need to know, from authentication, to manipulating results.  

The REST API provides programmatic access to read and write data. List documents, edit users, and more. The REST API identifies users using json webtokens; requests and responses are in JSON.

All JavaScript examples use the [superagent](https://github.com/visionmedia/superagent) library for HTTP requests to be easily readable.

## Table of Contents

* [Introduction](README.md)

### Endpoints
#### User
* [Login](user.md#user-login)
* [Create User](user.md#user-create)
* [Update User](user.md#user-update)

#### Collection
* [Create](collection.md#create)
* [Read](collection.md#read)
* [Update](collection.md#update)
* [Delete](collection.md#delete)


## Schema
All API access is accessed through http://example.com/api/. All data is sent and received as JSON.

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
