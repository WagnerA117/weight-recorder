import {config} from "dotenv";
config();

export default {
	port: 3000,
	API_KEY_JWT: process.env.API_KEY_JWT as string,
	TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN as string,
	SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
	FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
	FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY as string,
	FIREABASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL as string,
	FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL as string,
};
