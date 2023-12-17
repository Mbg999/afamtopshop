import { UUID } from "../deps.ts";

export async function generateUUIDV5(): Promise<string> {
  const namespaceurl = "69059435-9cc4-11ee-bb5a-d8bbc121855d";
  const data = new TextEncoder().encode(
    `${Date.now()}-${Math.random() * 1000}`,
  );
  return await UUID.v5.generate(namespaceurl, data);
}
