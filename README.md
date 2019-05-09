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

## Challenge I

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

```javascript
query{
  comments{
    id
    text
    author{
      name
    }
    post{
      id
      title
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
        },
        "post": {
          "id": "123456",
          "title": "Apertura Española"
        }
      },
      {
        "id": "2",
        "text": "Comment number two",
        "author": {
          "name": "Sara"
        },
        "post": {
          "id": "123456",
          "title": "Apertura Española"
        }
      },
      {
        "id": "3",
        "text": "Comment for the number three post",
        "author": {
          "name": "Andrew"
        },
        "post": {
          "id": "123457",
          "title": "Defensa Francesa"
        }
      },
      {
        "id": "4",
        "text": "This is comment number four. No more comments for the moment",
        "author": {
          "name": "Mike"
        },
        "post": {
          "id": "123458",
          "title": "Apertura Catalana"
        }
      }
    ]
  }
}
```

- Get the posts

Query:

```javascript
query{
  posts{
    id
    title
    body
    published
    comments{
      id
      text
    }
  }
}
````

Response:

```javascript
{
  "data": {
    "posts": [
      {
        "id": "123456",
        "title": "Apertura Española",
        "body": "Defensa española, lucha contra la defensa berlinesa",
        "published": true,
        "comments": [
          {
            "id": "1",
            "text": "Comment number one"
          },
          {
            "id": "2",
            "text": "Comment number two"
          }
        ]
      },
      {
        "id": "123457",
        "title": "Defensa Francesa",
        "body": "La francesa, el contraataque en el centro",
        "published": true,
        "comments": [
          {
            "id": "3",
            "text": "Comment for the number three post"
          }
        ]
      },
      {
        "id": "123458",
        "title": "Apertura Catalana",
        "body": "Los entresijos de la catalana",
        "published": false,
        "comments": [
          {
            "id": "4",
            "text": "This is comment number four. No more comments for the moment"
          }
        ]
      },
      {
        "id": "123459",
        "title": "Defensa Siciliana",
        "body": "Variante Paulsen",
        "published": true,
        "comments": []
      },
      {
        "id": "123460",
        "title": "Defensa Siciliana",
        "body": "Variante Najdorf",
        "published": false,
        "comments": []
      },
      {
        "id": "123461",
        "title": "Defensa Siciliana",
        "body": "Ataque inglés",
        "published": true,
        "comments": []
      }
    ]
  }
}
````

** Mutations

Several methods that modifiy the system.

** createUser

```javascript
mutation{
  createUser(name: "Alberto", email: "alberto.eyo@example.com"){
    id
    name
    email
    age
  }
}
```

Response: 

```javascript
{
  "data": {
    "createUser": {
      "id": "0cd392b5-e9ab-45d8-af40-5b0e912625e7",
      "name": "Alberto",
      "email": "alberto.eyo@example.com",
      "age": 0
    }
  }
}
```

** createPost

```javascript
mutation{
  createPost(title: "Post from client", 
    body: "This is the first post from the client", 
    published: true, author: "1"){
   id
   title
   body
  }
}
````

Response:

```javascript
{
  "data": {
    "createPost": {
      "id": "1669924f-241b-4a84-b107-41723d0067e2",
      "title": "Post from client",
      "body": "This is the first post from the client"
    }
  }
}
```

** createComment

```javascript
mutation{
  createComment(text: "Comentario creado desde el cliente",
  author: "1", post: "123456"){
    id
    text
    post{
      id
      title
    }
    author{
      id
      name
      email
    }
  }
}
```

Response:

```javascript
{
  "data": {
    "createComment": {
      "id": "0a03fdec-a14f-4aa7-a366-bd1241f21a13",
      "text": "Comentario creado desde el cliente",
      "post": {
        "id": "123456",
        "title": "Apertura Española"
      },
      "author": {
        "id": "1",
        "name": "Andrew",
        "email": "andrew@example.com"
      }
    }
  }
}
```

