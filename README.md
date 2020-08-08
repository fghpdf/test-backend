# Wiredcraft Back-end Developer Test

Make sure you read the whole document carefully and follow the guidelines in it.

## Usage
It is a project by NestJs.

You can quick start following these commands:
```shell
yarn install
```

run and open http://localhost:3000 in your browser
**You should init the database before run start**
```shell
npm run start
```

run test
```shell
npm run test
```

## API Document

You can find a file which name is apiary.apib.

And you can see this document in this [link](https://xiangxuanqu.docs.apiary.io/#)

### Init Database

This project uses MySQL.

You must create a database `test` in your MySQL.

More database config you can see the file -- app.module.ts

```
{
  "id": "xxx",                  // user ID 
  "name": "test",               // user name
  "dob": "",                    // date of birth
  "address": "",                // user address
  "description": "",            // user description
  "createdAt": ""               // user created date
}
```
