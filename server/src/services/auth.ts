import {firestore} from "./firebase";
import {UserType} from "../types";
import {compareHashes, hashPassword, signToken, validateToken} from "../lib";

const usersCollection = firestore.collection("users");

const signUp = async (username: string, password: string) => {
	//Check if the user exists
	const {docs} = await usersCollection.where("username", "==", username).get();

	if (docs.length > 0) {
		throw new Error("User already exists");
	}

	//Hash the password
	const hashedPassword = await hashPassword(password);
	const user = await usersCollection.add({
		username,
		password: hashedPassword,
	});

	console.log(password, hashedPassword);

	const token = signToken(user.id, username);

	return token;
};

const login = async (username: string, password: string) => {
	const {docs} = await usersCollection.where("username", "==", username).get();
	const user = docs[0];

	const {password: hashedPassword} = user.data();

	const validPassword = await compareHashes(password, hashedPassword as string);
	if (!validPassword) {
		throw new Error("Invalid Credentials");
	}

	const token = signToken(user.id, username);
	return token;
};

const validate = async (token: string): Promise<UserType> =>
	validateToken(token);

export {signUp, login, validate};
