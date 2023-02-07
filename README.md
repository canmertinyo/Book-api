<p align="center">
<img src="https://i.imgur.com/LWHxXg1.png" alt="a" width="800" height="300"/>
</p>

# Quick brief
You can create/update/delete books and authors

# Installation
First we must install all dependencies. write this in terminal : 
```ts
npm install 
```

#Setting up database
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
# Contributing

1. Fork this repository.
2. Create a new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

Details will be added in the future
There are known bugs i will fix them as soon as possible.
