# GraphQL

* Specification -->  https://facebook.github.io/graphql/June2018/
* Playground --> http://graphql-demo.mead.io/

Query the users:

```javascript
query{
  users{
    id
    name
    email
    age
    posts{
      id
      title
    }
  }
}
```

Query the posts:

```javascript
query{
  posts{
    id
    title
    body
    published
    author{
      name
    }
  }
}
```

Query the comments:

```javascript
query{
  comments{
    id
    text
  }
}
```

** Challenge I

- Get the users

```javascript
query{
  users{
    id
    name
    email
    age
    posts{
      id
      title
    }
    comments{
      text
      id
    }
  }
}
```

Response:

```javascript
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Andrew",
        "email": "andrew@example.com",
        "age": 27,
        "posts": [
          {
            "id": "123456",
            "title": "Apertura Española"
          },
          {
            "id": "123459",
            "title": "Defensa Siciliana"
          },
          {
            "id": "123461",
            "title": "Defensa Siciliana"
          }
        ],
        "comments": [
          {
            "text": "Comment number one",
            "id": "1"
          },
          {
            "text": "Comment for the number three post",
            "id": "3"
          }
        ]
      },
      {
        "id": "2",
        "name": "Sara",
        "email": "sara@example.com",
        "age": null,
        "posts": [
          {
            "id": "123457",
            "title": "Defensa Francesa"
          },
          {
            "id": "123460",
            "title": "Defensa Siciliana"
          }
        ],
        "comments": [
          {
            "text": "Comment number two",
            "id": "2"
          }
        ]
      },
      {
        "id": "3",
        "name": "Mike",
        "email": "mike@example.com",
        "age": null,
        "posts": [
          {
            "id": "123458",
            "title": "Apertura Catalana"
          }
        ],
        "comments": [
          {
            "text": "This is comment number four. No more comments for the moment",
            "id": "4"
          }
        ]
      }
    ]
  }
}
```

- Get the comments

Query:

´´´javascript
query{
  comments{
    id
    text
    author{
      name
    }
  }
}
```

Response:

```javascript
{
  "data": {
    "comments": [
      {
        "id": "1",
        "text": "Comment number one",
        "author": {
          "name": "Andrew"
        }
      },
      {
        "id": "2",
        "text": "Comment number two",
        "author": {
          "name": "Sara"
        }
      },
      {
        "id": "3",
        "text": "Comment for the number three post",
        "author": {
          "name": "Andrew"
        }
      },
      {
        "id": "4",
        "text": "This is comment number four. No more comments for the moment",
        "author": {
          "name": "Mike"
        }
      }
    ]
  }
}
```