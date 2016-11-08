# blog-tdd

## install express

```
npm install express-generator -g
express -e
npm isntall
```

## install mongodb

```
npm install mongodb --save
```

## install mongoose

```
npm install mongoose --save
```

## install mocha

```
npm install mocha -D
```

## install chai

```
npm install chai --save
```

## install chai-http

```
npm install chai-http --save
```

## install passport

```
npm install passport --save
```

## install passport-local

```
npm install passport-local
```

## install passport-local-mongoose

```
npm install passport-local-mongoose
```

## install dotenv

```
npm install dotenv --save
```

## install express session

```
npm install express-session
```

## API User

| Endpoint                      | HTTP      | Description               |
| ----------                    | -----     | ------------              |
| api/user/seed                 | GET       | Create Dummy User Data    |
| api/user                      | GET       | Get All User              |
| api/register                  | POST      | Register User             |
| api/user/delete               | DELETE    | Delete All User           |
| api/user/delete/:userId       | DELETE    | Delete User By userId     |
| api/user/put/:userId          | PUT       | Update User By userId     |

## API Blog

| Endpoint                      | HTTP      | Description               |
| ----------                    | -----     | ------------              |
| api/blog/seed                 | GET       | Create Dummy Blog Data    |
| api/blog                      | GET       | Get All Blog              |
| api/blog/delete               | DELETE    | Delete All Blog           |
| api/blog/delete/:blogId       | DELETE    | Delete Blog By blogId     |
| api/blog/put/:blogId          | PUT       | Update Blog By blogId     |