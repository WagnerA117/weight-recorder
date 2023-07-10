import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";
import {UserType} from "../types";

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
	return await bcrypt.hash(password, salt);
};

const compareHashes = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};

const signToken = (id: string, username: string) => {
	console.log("this ran in the lib, the sign token");

	return jwt.sign({id, username}, config.API_KEY_JWT, {
		expiresIn: config.TOKEN_EXPIRES_IN,
	});
};

const validateToken = (token: string) => {
	return new Promise<UserType>((resolve, reject) => {
		console.log("this ran in the lib, the validate token function");
		jwt.verify(token, config.API_KEY_JWT, (err, decoded) => {
			if (err) return reject(err);

			resolve(decoded as UserType);
		});
	});
};
``;

export {hashPassword, compareHashes, signToken, validateToken};
