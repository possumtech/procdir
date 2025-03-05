import fs from 'fs';
import path from 'node:path';

export default async function procdir (client, options = {}) {
  if (!client) throw new Error('No client received by procdir');
  if (typeof options !== 'object') throw new Error('Incorrect option format');

  client.on('error', (err) => console.error(err.stack));

  if (!options?.dir) options.dir = './sql/';

  if (options.dir.substr(-1) != '/') options.dir += '/';

  const files = fs
    .readdirSync(options.dir)
    .filter((file) => path.extname(file) == '.sql')
    .map((file) => fs.readFileSync(options.dir + file, 'utf8'))
    .join('\n');

  const o = {};

  // NOTIFICATIONS
  client.on('notification', ({channel, payload}) => {
    console.log(channel, payload);
    o[channel](payload);
  });

  // PROCEDURES
  let match = /(?<=-- PROCEDURE: )(?<name>\w+)\s+(?<text>.*?)(?=-- STOP)/gims;
  const procs = files.matchAll(match);
  for (const { groups: { name, text } } of procs) {
    await client.query(text);
    o[name] = async (values) => {
      const paramCount = values.map((value, i) => `\$${i + 1}`).join(', ');
      return client.query(`CALL ${name} (${paramCount});`, values);
    };
  }

  // QUERIES
  match = /(?<=-- QUERY: )(?<name>\w+)\s+(?<text>.*?)(?=-- STOP)/gims;
  const queries = files.matchAll(match);
  for (const { groups: { name, text } } of queries) {
    o[name] = async (values) => {
      return client.query({ name, text, values });
    };
  }

  return o;
}
