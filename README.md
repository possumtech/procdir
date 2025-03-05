# procdir

Retrieve PostgreSQL stored procedures and prepared statements from a dedicated directory. Instead of mixing your SQL code in with your Javascript or Typescript code, create a `sql/` folder in your project that contains one or more `example.sql` files which the `procdir` module reads and compiles when instantiated.

Features:

* Cleaner Project

It's aesthetically unpleasant to jumble SQL and JS/TS together. It's more difficult for both you and your tools to get formatting straight when the two languages are mashed up together. When you have all your SQL in a dedicated folder, you can use whatever filenames you wish to effectively label and organize the SQL parts of your codebase.

* Best Practices

All of your calls to the database should be in precompiled stored procedures. This makes for superior performance and security.

* Small Footprint

This package is tiny, with no dependencies.

### Prerequisites

* This package depends on the `pg` PostgreSQL package

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

The `myProcs.sql` file may look something like this...

    -- QUERY: howdyWorld
    SELECT CONCAT('Howdy, ', COALESCE($1, 'world'), '!') AS greeting;
    -- STOP

    -- PROCEDURE: procDirInit
    CREATE OR REPLACE PROCEDURE procDirInit (INTEGER) LANGUAGE plpgsql AS $$
    BEGIN

    CREATE TABLE IF NOT EXISTS procDir (numbers INTEGER);

    INSERT INTO procDir (numbers) VALUES ($1);

    $$;
    -- STOP

You must have the synax for `-- QUERY: name` and `-- PROCEDURE name`, followed
by `-- STOP` exactly as shown for each query and procedure or `procdir` won't
detect and handle the queries and procedures. The idea for anything that's not a
query or procedure is that you can create them on the server with a procedure
and then access them with a query.

#### Step 3: Access your `procdir` procedures

In this example, we connect to the server, execute our stored procedure, and run
our prepared statement.

    import pg from 'pg'
    import procdir from 'procdir';
    
    const { Client } = pg;
    const client = new Client();
    await client.connect();
    
    await client.procDirInit([42]);
    
    const howdyWorld = await sql.howdyWorld([null]);
    const howdyMars = await sql.howdyWorld(['mars']);
    
    console.log(howdyWorld.rows[0]);
    console.log(howdyMars.rows[0]);
    
    await pool.end();

## Testing

An example is offered in `test/procTest.js`. This requires installing the `pg`
package first, as `procdir` doesn't include any packages.

    ~$ cd procdir
    ~$ npm install pg
    ~$ cd test
    ~$ user=pglearn password=secret123 database=pglearn node ./procTest.js

## Built With

* [Node](https://nodejs.org/) - The server-side JS environment
* [PostgreSQL](https://www.postgresql.org/) - The PostgreSQL server
* [pg](https://www.npmjs.com/package/pg) - A PostgreSQL client for Node

## Contributing

Contributors to this project are not a community. You are not expected to think or behave as if you belong to a community. Should you feel the need to join a community, please refer to the nearest church, mosque, synagogue, temple, community center, or other appropriate venue for community building. Only attempts to contribute to the project contribute to the project and all other communication is generally inappropriate and unwelcome.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **wikitopian** - *Initial work* - [@wikitopian](https://github.com/wikitopian)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
