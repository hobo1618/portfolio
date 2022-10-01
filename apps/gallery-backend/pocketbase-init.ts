import PocketBase from "pocketbase";

export default async function pocketbaseInit(user: string, password: string) {
  const client = new PocketBase("http://localhost:8090/");
  const adminAuthData = await client.admins.authViaEmail(user, password);
  return client;
}