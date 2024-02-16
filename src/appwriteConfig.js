import { Account, Client, Databases } from "appwrite";

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES

const client = new Client();

client
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);

export default client;

export const account = new Account(client);
export const databases = new Databases(client);




