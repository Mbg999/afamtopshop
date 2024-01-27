import { categoryRepositoryImpl } from "../persistence/repositories/repositories.impl.ts";

export default async function Hello() {
  const items = await getItems();
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
      <hr />
      {/* <ul>
        {items.map((items) => (
          <li key={items.id}>{JSON.stringify(items)}</li>
        ))}
      </ul> */}
    </div>
  );
}

async function getItems(): Promise<any> {
  let items;
  try {
    // const db = new DBMySql()
    // const conn = await db.getConnection()
    // items = await conn.query("SELECT c.* FROM categories as c")
    const rep = categoryRepositoryImpl();
    items = await rep.delete("0001bf80-9cc7-11ee-bb5a-d8bbc121855d");
    console.log(items);
  } catch (err) {
    items = Promise.resolve([]);
    console.error(err);
  }
  return items;
}
