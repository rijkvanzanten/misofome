# Collection endpoints
The collection endpoints are the main way of dealing with data in the api. The endpoints allow to perform the CRUD operations on your own defined data models.

## Create Document
### Request
```
POST /api/collection/[collection-name]
```

|name       |value   |description                                    |
|-----------|--------|-----------------------------------------------|
|collection |REQUIRED|Collection in which the document will be added |
|data       |        | This data and its architecture is based on your specific project's schema. |

Example request
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." -X POST -d '{"title":"Card Title","content":"#supermooi"}' http://localhost:3000/api/collection/card
```

```js
const card = {
  title: 'Card Title',
  content: '#supermooi',
};

request
  .post('/api/collection/card')
  .set('x-access-token', 'eyJhbGc...')
  .send(card)
  .end();
```

### Example Response
Successful request returns the created record
```json
{
  "record": {
    "__v": 0,
    "updatedAt": "2017-01-21T14:40:21.086Z",
    "createdAt": "2017-01-21T14:40:21.086Z",
    "title": "Card Title",
    "content": "#supermooi",
    "createdBy": "58821d24fd598372b00165a0",
    "_id": "588372d5458c77141fff58b6"
  }
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|201      |Creation successful    |
|403      |Model disabled         |
|500      |Internal server error  |

---

## Get Documents
### Request
```
GET /api/collection/[collection-name]
```

|name       |value   |description                                    |
|-----------|--------|-----------------------------------------------|
|populate   |property|Comma separated list of properties that will be populated|
|where[property]| value| Filter items by property value combination |
|order_by   |property|Order results by property value |
|order      |[asc,desc]| Sort results ascending or descending
|per_page   |Number | Set amount of results to return per call|
|page       |Number | Set which page to retrieve (required per_page to be set) |

Example request
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." http://localhost:3000/api/collection/card?order_by=title&order=desc
```

```js
request
  .get('/api/collection/card')
  .query({
    order_by: 'title',
    order: 'desc'
  })
  .set('x-access-token', 'eyJhbGc...')
  .end();
```

### Example Response
Successful request returns array of selected records
```json
[
  {
    "_id": "588378d25df1301d852b7e28",
    "updatedAt": "2017-01-21T15:05:54.347Z",
    "createdAt": "2017-01-21T15:05:54.347Z",
    "title": "Nog een card",
    "content": "Mooie kaart joo",
    "createdBy": "58821d24fd598372b00165a0",
    "__v": 0
  },
  {
    "_id": "588372d5458c77141fff58b6",
    "updatedAt": "2017-01-21T14:40:21.086Z",
    "createdAt": "2017-01-21T14:40:21.086Z",
    "title": "Card Title",
    "content": "#supermooi",
    "createdBy": "58821d24fd598372b00165a0",
    "__v": 0
  }
]
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|200      |Success                |
|403      |Model disabled         |
|500      |Internal server error  |

---

## Update Document
### Request
```
PUT /api/collection/[collection-name]/[document-id]
```

|name       |value   |description                                    |
|-----------|--------|-----------------------------------------------|
|collection |REQUIRED|Collection in which the document exists       |
|document |REQUIRED| Document to update |
|data       |        | This data and its architecture is based on your specific project's schema. |

Example request
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." -X PUT -d '{"content":"Updated content"}' http://localhost:3000/api/collection/card/58838a07592d2a574cd706bf
```

```js
request
  .put('/api/collection/card/58838a07592d2a574cd706bf')
  .set('x-access-token', 'eyJhbGc...')
  .send({
    content: 'Updated content',
  })
  .end();
```

### Example Response
Successful request returns the updated record
```json
{
  "record": {
    "__v": 0,
    "updatedAt": "2017-01-21T14:40:21.086Z",
    "createdAt": "2017-01-21T14:40:21.086Z",
    "title": "Card Title",
    "content": "Updated content",
    "createdBy": "58821d24fd598372b00165a0",
    "_id": "588372d5458c77141fff58b6"
  }
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|200      |Update successful      |
|401      |Document may only be updated by creator |
|403      |Model disabled         |
|500      |Internal server error  |

---

## Delete Document

### Request
```
DELETE /api/collection/[collection-name]/[document-id]
```

|name       |value   |description                                    |
|-----------|--------|-----------------------------------------------|
|collection |REQUIRED|Collection in which the document exists       |
|document   |REQUIRED| Document to delete |

Example request
```bash
$ curl -H "x-access-token: eyJhbGc..." -X DELETE http://localhost:3000/api/collection/card/58838a07592d2a574cd706bf
```

```js
request
  .delete('/api/collection/card/58838a07592d2a574cd706bf')
  .set('x-access-token', 'eyJhbGc...')
  .end();
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|200      |Deletion successful    |
|401      |Document may only be updated by creator |
|403      |Model disabled         |
|500      |Internal server error  |

---
