import pg from 'pg';

import procdir from '../procdir.js';

export default class ProcTest {
  constructor() {
  }

  async test() {
    const { Pool } = pg;

    const { user, password, database } = process.env;

    const pool = new Pool({ user, password, database });

    const sql = await procdir(pool, { dir: '.' });

    await sql.procDirInit([42]);

    const howdyWorld = await sql.howdyWorld([null]);
    const howdyMars = await sql.howdyWorld(['mars']);

    console.log(howdyWorld.rows[0]);
    console.log(howdyMars.rows[0]);

    await pool.end();
  }
}

const procTest = new ProcTest();
await procTest.test();
