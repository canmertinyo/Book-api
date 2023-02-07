<p align="center">
<img src="https://i.imgur.com/LWHxXg1.png" alt="a" width="800" height="300"/>
</p>

<p align="center">⚡A useful books api with typescript&express</p>

#Third party:
-Magnodi
-Cors
-Express
-Prisma
-Mongodb
-Helmet
-EsLint

# Quick brief

You can create/update/delete books and authors

# Installation

First we must install all dependencies. write this in terminal :

```ts
npm install
```

# Setting up database

.env configuration :

```env
DATABASE_URL="yourdatabaselink"
PORT=5000 (or you can put here a different port)
```

and open our prisma/schema.prisma file
define your database provider :
for example mine is mongodb. So i wrote here "mongodb"

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

# To Use

# Create new author (POST Method)
Open our postman application and send a post request to our server.
Example : http://localhost:5000/api/authors
Important Note : it supports only json format !
```json
{
        "firstName":"can",
        "lastName":"mert"
}
```
After that you will receive a new output like this : 
```json
{
    "id": "63e2d81210c0f8c2f6ff7c74",
    "firstName": "can",
    "lastName": "mert",
    "createdAt": "2023-02-07T23:00:34.277Z"
}
```
The api will give you a random id. Because if you wanna add new book on your own, you must give your id.

# Update author (PUT Method)
This api offers you a another method. If you want update any author in our database 
You must entry your id
example : http://localhost:5000/api/authors/63e2d81210c0f8c2f6ff7c74
```json
//BEFORE
{
        "firstName":"can",
        "lastName":"mert"
}
//AFTER
{
        "firstName":"canson",
        "lastName":"mert"
}
```

# Delete author (Delete Method)
To delete specific author you must give the id (with delete request) -----------
example : http://localhost:5000/api/authors/63e2d81210c0f8c2f6ff7c74

# Get author (Get Method) 
To get author with id : 
example : http://localhost:5000/api/authors/63e2d81210c0f8c2f6ff7c74











# Create book (Post method)
You can create a new book.
example : http://localhost:5000/api/books/

```json
{
        "title":"alice in wonderland",
        "authorId":"63e191ede0ab50fb3ab5717e",
        "datePublished":"2005-07-07",
        "isFiction":true
}
```

and you will receive new output. 
```json
{
    "id": "63e2db0710c0f8c2f6ff7c75",
    "title": "alice in wonderland",
    "isFiction": true,
    "authorId": "63e191ede0ab50fb3ab5717e",
    "datePublished":"2005-07-07"
}
```


# Delete book (Delete Method)
example : http://localhost:5000/api/books/63e2db0710c0f8c2f6ff7c75

# Get all books (Get method)
it will give you all the books in our database
example : http://localhost:5000/api/books

```json
   {
        "id": "63e191ede0ab50fb3ab57181",
        "title": "The wild animals",
        "datePublished": "2023-02-06T23:49:01.643Z",
        "isFiction": false,
        "authorId": "63e191ede0ab50fb3ab5717d"
    },
    {
        "id": "63e191ede0ab50fb3ab5717f",
        "title": "robin hood",
        "datePublished": "2023-02-06T23:49:01.643Z",
        "isFiction": false,
        "authorId": "63e191ede0ab50fb3ab5717d"
    }
```



# Contributing

1. Fork this repository.
2. Create a new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

Details will be added in the future
There are known bugs i will fix them as soon as possible.
