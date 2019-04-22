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