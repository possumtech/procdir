# procdir

Retrieve postgresql stored procedures from a dedicated directory. Instead of mixing your SQL code in with your Javascript or Typescript code, create a `sql/` folder in your project that contains one or more `example.sql` files which the `procdir` module reads and compiles when instantiated.

Features:

* Cleaner Project

It's aesthetically unpleasant to jumble SQL and JS/TS together. It's more difficult for both you and your tools to get formatting straight when the two languages are mashed up together. When you have all your SQL in a dedicated folder, you can use whatever filenames you wish to effectively label and organize the SQL parts of your codebase.

* Best Practices

All of your calls to the database should be in precompiled stored procedures. This makes for superior performance and security.

* Small Footprint

This module is very small and depends on nothing except the `pg` module you were already depending on anyway.

### Prerequisites

* This module depends on the `pg` module

### Getting Started

#### Step 1: Install `procdir`

First we add the module to our project.

    ~$ cd myRepo/
    ~/myRepo$ npm install procdir

#### Step 2: Create a stored procedure

Then we create a file and add a stored procedure definition to it.

    ~/myRepo$ mkdir ./sql
    ~/myRepo$ cd ./sql
    ~/myRepo/sql$ touch myProcs.sql
    ~/myRepo/sql$ vim myProcs.sql

    CREATE PROCEDURE helloWorld
    LANGUAGE SQL
    AS
    SELECT 'Hello, world';

#### Step 3: Access your `procdir` procedures

    import pg from 'pg'
    import procdir from 'procdir'; 
    
    const { Client } = pg
    const client = new Client()
    await client.connect()
    
    const procs = await procdir(client);
    console.log(procs.helloWorld());

## Built With

* [Node](https://nodejs.org/) - The server-side JS environment
* [PostgreSql](https://www.postgresql.org/) - The PostgreSQL server
* [pg](https://www.npmjs.com/package/pg) - A PostgreSQL client for Node

## Contributing

Contributors to this project are not a community. You are not expected to think or behave as if you belong to a community. Should you feel the need to join a community, please refer to the nearest church, mosque, synagogue, temple, community center, or other appropriate venue for community building. Only attempts to contribute to the project contribute to the project and all other communication is generally inappropriate and unwelcome.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **wikitopian** - *Initial work* - [@wikitopian](https://github.com/wikitopian)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
