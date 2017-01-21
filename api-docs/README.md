# Misofome API Reference

This documentation is intended to get you up and running with the current version of the Misofome API. We’ll cover everything you need to know, from authentication, to manipulating results.  

The REST API provides programmatic access to read and write Misofome's data. List cards, edit users, and more. The REST API identifies users using json webtokens; responses are available in JSON.

All JavaScript examples use the [superagent](https://github.com/visionmedia/superagent) library for HTTP requests to be easily readable.

# Schema
All API access is accessed through http://example.com/api/. All data is sent and received as JSON.

# Install
The first thing is to clone the [Misofome repo](https://github.com/RijkvanZanten/misofome)

```bash
$ git clone https://github.com/RijkvanZanten/misofome.git
```

Install node_modules with
```bash
$ npm install
```

The API can be started by starting the whole app in production mode with
```bash
$ npm start
```

You could also start the app in development mode (with autoreloading) with
```bash
$ npm run dev
```

If you want to develop just the api, start the app with `npm run dev:api`. This way, the app will skip launching the webpack building of the frontend, which saves on building time when editing the API.

{% method -%}
# Authentication {#authentication}
Most routes require you to authenticate by providing an access-token in the HTTP-headers.

See the `/user/` endpoints section of this documentation on how to receive this authentication token.

{% common -%}
Example request to /collection/cards
{% sample lang="http" -%}
```bash
$ curl -H "x-access-token: eyJhbG..." http://localhost:3000/api/collection/cards/
```

{% sample lang="js" -%}
```js
request
  .get('http://localhost:3000/api/collection/cards/')
  .set('x-access-token', 'eyJhbG...')
  .send();
```
{% endmethod %}
