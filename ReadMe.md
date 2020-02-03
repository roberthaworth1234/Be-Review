# Northcoders backend server project

This server project has been created to showcase my ability to construct an API using TDD. Migration and seeding of a SQL database, using PSQL and interacting using Knex. Please initialise my project and have a look at the different endpoints and utility functions etc.

## Getting Started

Once you have forked and cloned the git repository. cd into the be-nc-news file. You will need to initialise the prerequisites below.

```
git clone <forked repo url>
cd be-nc-news
```

### Prerequisites

Install the dependencies using npm install

```
npm install
```

If you would like to run my test files you will need devDependancies installed of mocha / chai and supertest. These are installed using terminal command - npm install mocha chai supertest -D (devDependancies).

```
npm install mocha chai supertest -D
```

At this point it would be beneficial to run the setups-dbs script as this will create the nc_news_database on your local machine for running migrations.

```
npm run setup-dbs
```

lastly you will need to create a knexfile.js, inside the be-nc-news file directory. Which will be your Knex config connection to the test or dev database.  If you are a linux user, this will contain your username and password. Use the following code for your the knexfile.

```js
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news"
      // user,
      // password
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // user,
      // password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

## Running the tests

Running the automated tests for the API is simply npm test.  This will re-seed the data for each test, as not affect other tests in the suite.
This will run all tests on each endpoint available. Should you want to test the utility functions used in manipulating the migration data, use the command npm run test-utils.

```
npm test
npm run test-utils
```


## Deployment


My deployed api url:

https://rh-nc-news-api.herokuapp.com/api




