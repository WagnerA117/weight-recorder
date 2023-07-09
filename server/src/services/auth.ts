import {firestore} from "../services/firebase";
import {UserType} from "../types";
import {compareHashes, hashPassword, signToken, validateToken} from "../lib";

const usersCollection = firestore.collection("users");

const signUp = async (userName: string, password: string) => {
	//Check if the user exists
	const {docs} = await usersCollection.where("userName", "==", userName).get();

	if (docs.length > 0) {
		throw new Error("User already exists");
	}

	//Hash the password
	const hashedPassword = await hashPassword(password);
	const user = await usersCollection.add({
		userName,
		password: hashedPassword,
	});

	const token = signToken(user.id, userName);

	return token;
};

const login = async (userName: string, password: string) => {
	const {docs} = await usersCollection.where("userName", "==", userName).get();

	const user = docs[0];

	const {password: hashedPassword} = user.data();

	const validPassword = await compareHashes(password, user.data().password);

	if (!validPassword) {
		throw new Error("Invalid Credentials");
	}

	const token = signToken(user.id, userName);

	return token;
};

const validate = async (token: string): Promise<UserType> =>
	validateToken(token);

export {signUp, login, validate};
