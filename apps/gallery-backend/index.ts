import pocketbaseInit from "pocketbase-init";

async function getItems() {
  const client = await pocketbaseInit(
    `${process.env.DB_USER}`,
    `${process.env.DB_PASS}`
  );
  const resultList = await client.records.getList("items", 1, 50, {
    filter: 'created >= "2022-01-01 00:00:00"',
  });
  return resultList.items
}