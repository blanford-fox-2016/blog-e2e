# Blog with Express and TDD
Implement testing  Restful API with Mocha.js and Chai.js in TDD - Test Driven Development

## How To Use
1. npm install
2. mocha test/api.articles.test.js (for test articles)
3. mocha test/api.users.test.js (for test users)

## Dependency
1. mocha.js : ```npm i -D mocha```
2. chai.js : ```npm i -S mocha```
3. express : ```npm i -g express```
4. mongodb : ```npm i -S mongodb```
5. mongoose : ```npm i -S mongoose```
6. passport : ```npm i -S passport```
7. passport-local : ```npm i -S passport-local```
8. passport-local-mongoose : ```npm i -S passport-local-mongoose```
9. chai-http : ```npm i -S chai-http```

## Databases Configuration
1. Database's name : db_blog
2. Database's collections :
    * Users
      * username (string)
      * password (string)
    * Articles
      * content (string)

## End Point RESTful API Routes
Default development host & port : http://localhost:3000

| Routes | HTTP | Description |
|--------|------|-------------|
| api/users | GET | get respond JSON of all users's data  |
| api/users | POST | process & get respond JSON the new user's data |
| api/users/:id | PUT | process & get respond JSON the edited user's data |
| api/users/:id | DELETE | process & get respond JSON the deleted user's data |
| api/articles | GET | get respond JSON of all articles's data  |
| api/articles | POST | process & get respond JSON the new blog's data |
| api/articles/:id | PUT | process & get respond JSON the edited blog's data |
| api/articles/:id | DELETE | process & get respond JSON the deleted blog's data |

## File Structure
```
.
├── README.md
└── server
    ├── app.js
    ├── bin
    ├── controllers
    ├── models
    ├── package.json
    ├── public
    ├── routes
    ├── test
    └── views

8 directories, 3 files
```

## Package JSON
```
{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.15.1",
    "chai": "^3.5.0",
    "chai-http": "^3.0.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "express-session": "^1.14.2",
    "jade": "~1.11.0",
    "mongodb": "^2.2.11",
    "mongoose": "^4.6.6",
    "morgan": "~1.7.0",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.0.0",
    "serve-favicon": "~2.3.0"
  },
  "devDependencies": {
    "mocha": "^3.1.2",
    "nodemon": "^1.11.0"
  }
}

```

## Contributor
Ken Duigraha Putra &copy; 2016

## License
MIT
