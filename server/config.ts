import {config} from "dotenv";
config();

export default {
	port: 3000,
	API_KEY_JWT: process.env.API_KEY_JWT as string,
	TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN as string,
	SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
	FB_PROJECT_ID: process.env.FB_PROJECT_ID as string,
	FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY as string,
	FB_DATABASE_URL: process.env.FB_DATABASE_URL as string,
	FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL as string,
};
