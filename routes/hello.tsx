import { DB } from "../db/db.ts";

export default async function Hello() {
  const users = await getUsers();
  return (
    <div>
      <h1>hola mundo</h1>
      <ul>
        <li>
          <a href="https://deno.land/x/mysql@v2.12.1" target="_blank">
            mysql driver
          </a>
        </li>
        <li>
          <a href="https://deno.land/x/nessie@2.0.11" target="_blank">
            nessie migraciones base de datos
          </a>
        </li>
        <li>
          <a
            href="https://deno.land/x/nessie@2.0.11#remote-migration-or-seed-files"
            target="_blank"
          >
            nessie docs
          </a>
        </li>
        <li>
          <a href="https://www.thisdot.co/blog/hey-deno-where-is-my-package-json">
            deps
          </a>
        </li>
      </ul>
      <hr/>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

async function getUsers(): Promise<any[]> {
  let users;
  try {
    const connection = await DB.getConnection();
    users = await connection.query("SELECT * FROM users");
  } catch (err) {
    users = [];
    console.error(err);
    DB.closeConnection();
  }
  return users;
}
