# Endpoints

---

# Login {#user-login}
Authenticate user based on login credentials

{% method -%}
## Request
```
POST /api/user/login
```

|name     |value   |description   |
|---------|--------|--------------|
|username |REQUIRED|              |
|password |REQUIRED|              |

{% common -%}
Example request
{% sample lang="http" -%}
```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"rijk","password":"rijk"}' http://localhost:3000/api/user/login
```

{% sample lang="js" -%}
```js
const user = {
  username: 'rijk',
  password: 'rijk',
};

request
  .post('/api/1/user/login')
  .send(user)
  .end();
```
{% endmethod %}

## Example Response
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
|401      |User not found         |
|500      |Internal server error  |

---

# Create user {#user-create}
Create new user

{% method -%}
## Request
```
POST /api/user/
```

|name       |value   |description                                                                 |
|-----------|--------|----------------------------------------------------------------------------|
|username   |REQUIRED|                                                                            |
|password   |REQUIRED|                                                                            |
|Custom Data|        | This data and its architecture is based on your specific project's schema. |

{% common -%}
Example request
{% sample lang="http" -%}
```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"rijk","password":"rijk"}' http://localhost:3000/api/user/
```

{% sample lang="js" -%}
```js
const user = {
  username: 'rijk',
  password: 'rijk',
};

request
  .post('/api/1/user/')
  .send(user)
  .end();
```
{% endmethod %}

## Example Response
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

# Update {#user-login}
Update current logged in user

{% method -%}
## Request
```
PUT /api/user/
```

|name     |value   |description   |
|---------|--------|--------------|
|username |REQUIRED|              |
|password |REQUIRED|              |
|Custom Data|        | This data and its architecture is based on your specific project's schema. |

{% common -%}
Example request
{% sample lang="http" -%}
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." -X PUT -d '{"fullName": "Rijk van Zanten"}' http://localhost:3000/api/user/
```

{% sample lang="js" -%}
```js
request
  .put('/api/1/user')
  .set('x-access-token', 'eyJhbGc...')
  .send({
    fullName: 'Rijk van Zanten'
  })
  .end();
```
{% endmethod %}

## Example Response
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
