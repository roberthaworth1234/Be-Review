# Rob Haworths Northcoders backend server project

This server project has been created to showcase my ability to construct an API using TDD. My ability to use a PSQL database and interact using Knex. Please initialise my project and have a look at the different endpoint and utility functions etc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
Once you have forked and downloaded the git repository. You will need to initialise the prerequisites below.

### Prerequisites

You will need devDependancies installed of mocha / chai and supertest. These are installed using terminal command - npm install mocha chai supertest -D.

You will also need dependancies of pg / knex / express and chai sorted. These are installed using command - npm install excluding (-D) which is for devDependancies only.

lastly you will need a knexfile.js which if you are a linux user, contains your password. Use the following code in the knexfile.

```
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

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Running the automated tests for the API endpoints is simply npm test. This will run all tests on each endpoint available. Should you want to test the utility functions for migrations, use the command npm run test utils.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
