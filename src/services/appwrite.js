import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65483fc702a09b5a3578');

export { client }

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);