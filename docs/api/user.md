# User endpoints
The user endpoints are made to be able to authenticate users and to make adjustments to the users collection.

## Login User
Authenticate user based on login credentials

### Request
```
POST /api/user/login
```

|name     |value   |description   |
|---------|--------|--------------|
|username |REQUIRED|              |
|password |REQUIRED|              |

Example request
```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"rijk","password":"rijk"}' http://localhost:3000/api/user/login
```

```js
const user = {
  username: 'rijk',
  password: 'rijk',
};

request
  .post('/api/user/login')
  .send(user)
  .end();
```

### Example Response
Successful request returns the logged in user and the access token
```json
{
  "user": {
    "_id": "58821d24fd598372b00165a0",
    "fullName": "Rijk van Zanten",
    "username": "rijk",
    "__v": 0,
    "amisosResults": [],
    "image": {
      "filename": "random-svg"
    },
    "favorites": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODgyMWQyNGZkNTk4MzcyYjAwMTY1YTAiLCJpYXQiOjE0ODQ5MjgzMzF9.Mspn2EPZ2v7uJFnX4kKFjco8vjqE99YqRyOTdTxiaVk"
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|200      |Login successful       |
|400      |Username or password missing   |
|401      |User not found         |
|500      |Internal server error  |

---

## Create User
Create new user

### Request
```
POST /api/user/
```

|name       |value   |description                                                                 |
|-----------|--------|----------------------------------------------------------------------------|
|username   |REQUIRED|                                                                            |
|password   |REQUIRED|                                                                            |
|Custom Data|        | This data and its architecture is based on your specific project's schema. |

Example request
```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"rijk","password":"rijk"}' http://localhost:3000/api/user/
```

```js
const user = {
  username: 'rijk',
  password: 'rijk',
};

request
  .post('/api/user/')
  .send(user)
  .end();
```

### Example Response
Successful request returns the created user and the access token
```json
{
  "user": {
    "_id": "58821d24fd598372b00165a0",
    "fullName": "Rijk van Zanten",
    "username": "rijk",
    "__v": 0,
    "amisosResults": [],
    "image": {
      "filename": "random-svg"
    },
    "favorites": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODgyMWQyNGZkNTk4MzcyYjAwMTY1YTAiLCJpYXQiOjE0ODQ5MjgzMzF9.Mspn2EPZ2v7uJFnX4kKFjco8vjqE99YqRyOTdTxiaVk"
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|201      |User created           |
|409      |Username exists already|
|500      |Internal server error  |


---

## Update User
Update current logged in user

### Request
```
PUT /api/user/
```

|name     |value   |description   |
|---------|--------|--------------|
|username |REQUIRED|              |
|password |REQUIRED|              |
|Custom Data|        | This data and its architecture is based on your specific project's schema. |

Example request
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." -X PUT -d '{"fullName": "Rijk van Zanten"}' http://localhost:3000/api/user/
```

```js
request
  .put('/api/user')
  .set('x-access-token', 'eyJhbGc...')
  .send({
    fullName: 'Rijk van Zanten'
  })
  .end();
```

### Example Response
Successful request returns the updated user
```json
{
  "user": {
    "_id": "58821d24fd598372b00165a0",
    "fullName": "Rijk van Zanten",
    "username": "rijk",
    "__v": 0,
    "amisosResults": [],
    "image": {
      "filename": "random-svg"
    },
    "favorites": []
  }
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|200      |User updated           |
|409      |Duplicate key error    |
|500      |Internal server error  |
