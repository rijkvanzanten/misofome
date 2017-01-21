# Create Document {#create}

{% method -%}
## Request
```
POST /api/collection/[collection-name]
```

|name       |value   |description                                    |
|-----------|--------|-----------------------------------------------|
|collection |REQUIRED|Collection in which the document will be added |
|data       |        | This data and its architecture is based on your specific project's schema. |

{% common -%}
Example request
{% sample lang="http" -%}
```bash
$ curl -H "Content-Type: application/json" -H "x-access-token: eyJhbGc..." -X POST -d '{"title":"Card Title","content":"#supermooi"}' http://localhost:3000/api/collection/card
```

{% sample lang="js" -%}
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
{% endmethod %}

## Example Response
Successful request returns the created record
```json
{
  "record": {
    "__v": 0,
    "updatedAt": "2017-01-21T14:40:21.086Z",
    "createdAt": "2017-01-21T14:40:21.086Z",
    "title": "Card Title",
    "content": "#supermooi",
    "user": "58821d24fd598372b00165a0",
    "_id": "588372d5458c77141fff58b6"
  }
}
```

#### Possible HTTP status codes
|Code     |Description            |
|---------|-----------------------|
|201      |Creation successful    |
|500      |Internal server error  |

---
